# RChilli MCP Hub

Connect any MCP-enabled AI assistant — Claude, Cursor, Cline, or 
custom agents — to RChilli's full HR intelligence platform.

Parse resumes, analyse job descriptions, search and match candidates,
redact bias fields, run taxonomy lookups, and convert documents —
all through natural language.

**Production endpoint:** `https://mcp.rchilli.ai/mcp`  
**Transport:** Streamable HTTP · **MCP Spec:** 2025-03-26  
**Protocol:** JSON-RPC 2.0

---

## Authentication

RChilli MCP Hub uses **OAuth 2.1 Authorization Code + PKCE**.

For interactive clients (Claude Desktop, Cursor):
- Enter your **Client ID** and **Client Secret** from your 
  RChilli account dashboard
- The server handles the full OAuth flow automatically — 
  no manual token management needed
- Access tokens expire after 1 hour; refresh tokens last 30 days 
  and renew silently

For server-to-server integrations, `client_credentials` grant 
is also supported.

---

## Quick Connect

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rchilli-mcp-hub": {
      "transport": "streamable-http",
      "url": "https://mcp.rchilli.ai/mcp"
    }
  }
}
```

### Claude.ai Connector

| Field         | Value                              |
|---------------|------------------------------------|
| Server URL    | `https://mcp.rchilli.ai/mcp`       |
| Client ID     | Your RChilli Client ID             |
| Client Secret | Your RChilli Client Secret         |

### Cursor / Cline / VS Code

Set transport to **Streamable HTTP** and URL to 
`https://mcp.rchilli.ai/mcp`. The OAuth flow opens automatically 
on first connect.

---

## Tools — 18 Total

### Resume & JD Parser (4 tools)

| Tool | What It Does |
|------|-------------|
| `resume_parse_file` | Parse a resume from a file (PDF, DOCX, etc.) or plain text and return structured candidate data |
| `resume_parse_url` | Parse a resume from any public URL |
| `jd_parse_file` | Parse a Job Description from a file and extract skills, requirements, and role details |
| `jd_parse_text` | Parse a Job Description from plain text |

### Taxonomy (4 tools)

| Tool | What It Does |
|------|-------------|
| `taxonomy_skill_search` | Search for detailed skill information — related skills, categories, and metadata |
| `taxonomy_job_profile_search` | Search for job profile details — related titles, skill requirements, and classifications |
| `taxonomy_autocomplete_skill` | Get skill name suggestions as you type |
| `taxonomy_autocomplete_job_profile` | Get job profile name suggestions as you type |

### Resume Redact (1 tool)

| Tool | What It Does |
|------|-------------|
| `resume_redact` | Remove bias fields (name, DOB, gender, photo, etc.) from a resume before sharing with employers |

### Plugins (6 tools)

| Tool | What It Does |
|------|-------------|
| `plugin_resume_template` | Convert a resume into a styled template format |
| `plugin_document_convert` | Convert a resume between formats (PDF, DOCX, DOC, RTF, HTML) |
| `plugin_ner_tagger` | Extract named entities — job title, city, skills, dates — from text |
| `plugin_contact_extractor` | Extract contact details — name, email, phone, address — from text |
| `plugin_geo_location` | Resolve latitude and longitude for candidate or job locations |
| `plugin_job_zone` | Determine the Job Zone level (1–5) for the role in a resume |

### Search & Match Engine (3 tools)

| Tool | What It Does |
|------|-------------|
| `search_simple_search` | Keyword search across all indexed resumes or JDs |
| `search_match` | Match a document against your entire index and return ranked results |
| `search_one_match` | One-to-one match between a specific resume and a specific JD |

---

## Built-in Resources (4)

| Resource | Purpose |
|----------|---------|
| `rchilli://supported-file-types` | List of accepted file formats per tool category |
| `rchilli://field-reference/resume` | Reference guide for resume parser output fields |
| `rchilli://field-reference/jd` | Reference guide for JD parser output fields |
| `rchilli://index-types` | Valid values for search index type and document type |

---

## Response Format

Every tool returns a consistent envelope:

```json
{
  "success": true,
  "data": { },
  "meta": {
    "trace_id": "uuid",
    "latency_ms": 312.45
  }
}
```

Errors follow the same structure with `success: false` and an 
`error` object containing a `code`, `message`, and `retryable` flag.

---

## Get Access

RChilli MCP Hub requires a valid RChilli account with an active plan.

- **Sign up / Login:**    https://myaccount.rchilli.com/account/login
- **Plans & Pricing:**    https://docs.rchilli.com/kc/Plan_Subscription_and_cost
- **Documentation:**      https://docs.rchilli.com/kc/index.html
- **Help Desk:**          https://help.rchilli.com/hc/en-us
- **Support Email:**      support@rchilli.com

