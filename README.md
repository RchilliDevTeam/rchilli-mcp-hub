<div align="center">
  <img src="https://raw.githubusercontent.com/RchilliDevTeam/rchilli-mcp-hub/main/rchilli-logo.png" alt="RChilli Logo" width="280" />

  <h1>RChilli MCP Hub</h1>

  <p><strong>The HR Intelligence Layer for AI Agents</strong></p>

  <p>
    Connect AI agents to RChilli's enterprise-grade HR APIs with zero boilerplate.<br/>
    Parse resumes, analyse job descriptions, match candidates, enrich skills,<br/>
    redact bias fields, and convert documents — all through a single MCP server.
  </p>

  <p>
    MCP Spec: 2025-11-26 &nbsp;|&nbsp;
    37 Tools &nbsp;|&nbsp;
    OAuth 2.1 &nbsp;|&nbsp;
    Streamable HTTP
  </p>

  <p>
    <strong>MCP Endpoint:</strong>
    <code>https://mcp.rchilli.ai/mcp</code>
  </p>
</div>

---

## What is RChilli MCP Hub?

RChilli MCP Hub is a production-grade MCP server that exposes RChilli's full
HR data intelligence platform as **37 AI-callable tools** across 4 categories.

Built on **15+ years of HR data intelligence**, it is trusted by ATS vendors,
HR technology platforms, staffing agencies, and enterprise recruiting teams
worldwide. Every tool returns a consistent, structured JSON response — no raw
exceptions, no inconsistent formats.

---

## ✨ Key Features

1. **Zero boilerplate** — One endpoint, one OAuth login, 37 tools ready to use
2. **OAuth 2.1 + PKCE** — No API keys to copy or paste; fully automatic auth flow
3. **200+ resume fields** — Name, contact, skills, experience, education, certifications, and taxonomy-enriched job profiles
4. **ONet / ESCO taxonomy** — 10,000+ curated skills and job profiles with canonical mappings
5. **Explainable matching** — Field-level evidence for every candidate-to-job score
6. **Bias redaction** — PII and bias field removal for fair-hiring workflows
7. **Document conversion** — PDF, DOCX, RTF, HTML — convert in any direction
8. **Auto-injected credentials** — `userkey` and `subuserid` injected from token; never pass them manually
9. **Consistent response envelope** — Every tool returns `{ success, data, meta }` with trace ID and latency

---

## 🎯 Use Cases

1. **Resume screening** — Parse and structure resumes for AI-powered shortlisting
2. **Job description analysis** — Extract required skills, experience range, and qualifications from any JD
3. **Candidate-to-job matching** — One-to-one fit scoring with field-level evidence, no indexing required
4. **Talent pool search** — Keyword and semantic search across your indexed resume database
5. **Skill gap analysis** — Identify what a candidate is missing for a specific role
6. **Bias-free hiring** — Redact names, photos, gender, and age before sharing with hiring managers
7. **Taxonomy enrichment** — Look up and autocomplete 10,000+ standardized skills and job titles
8. **Document standardization** — Convert and reformat candidate documents into consistent templates

---

## 🔐 Authentication

RChilli MCP Hub uses **OAuth 2.1 Authorization Code + PKCE (S256)** for
interactive clients and **OAuth 2.0 client_credentials** for server-to-server
integrations.

### Interactive flow (Claude, Cursor, Cline)

```
Your AI Client               MCP Server               RChilli Auth
─────────────────────   ───────────────────────   ──────────────────────
1. Discover config   →  /.well-known/
                         oauth-authorization-server
                         ← issuer, endpoints

2. Open login        →  GET /authorize
                         ← RChilli login page

3. User logs in      →  POST /authorize         →  validates credentials
                         ← 302 redirect + code      ← auth code

4. Exchange code     →  POST /token
   + PKCE verifier       ← Bearer token

5. Every tool call   →  Authorization: Bearer <token>
                         injects userkey + subuserid
                         → tool executes
```

**What this means for you:**
- The full OAuth flow opens automatically in a popup
- Access tokens refresh every **1 hour** silently
- Sessions stay active for **30 days** via refresh token

### Server-to-server (client_credentials)

```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=YOUR_ID&client_secret=YOUR_SECRET
```

---

## ⚡ Quick Connect

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

| Field | Value |
|-------|-------|
| Server URL | `https://mcp.rchilli.ai/mcp` |
| Client ID | Your RChilli Client ID |
| Client Secret | Your RChilli Client Secret |

### Cursor / Cline / VS Code

Set transport to **Streamable HTTP**, URL to `https://mcp.rchilli.ai/mcp`.
The OAuth popup opens on first connect and credentials are stored for reuse.

### 🔌 Other MCP Clients

Any MCP client that supports **Streamable HTTP** transport can connect
to RChilli MCP Hub using the production endpoint directly.

#### Smithery

```bash
npm install -g smithery
smithery mcp add dev-ko1g/rchilli
```

Or browse the listing at:
[https://smithery.ai/servers/dev-ko1g/rchilli](https://smithery.ai/servers/dev-ko1g/rchilli)

---

## 🛠️ Tools — 37 Total

`userkey` and `subuserid` are injected automatically from your Bearer token — you never need to pass them manually.

---

### 📄 Resume & Job Description Parsing (3 tools)

| Tool | What It Does |
|------|-------------|
| `extract_resume_data` | Extracts and converts resumes, CVs, and candidate documents into structured, searchable profiles with contact details, skills, experience, education, certifications, and taxonomy-enriched data. Supports 40+ languages, batch mode, and resume reprocessing. Auto-fills ATS fields in under 10 seconds — documented to increase candidate conversion by up to 194%. |
| `extract_resume_data_from_url` | Accepts a direct URL to a PDF, DOCX, or RTF file and returns the same normalized JSON profile as the Resume Data Extraction tool. Ideal for pipeline automation where resumes are stored in cloud storage, S3, or email attachments. |
| `extract_job_data` | Extracts and converts job descriptions into structured hiring data including job title, required skills, preferred skills, responsibilities, experience, education, and taxonomy-normalized role requirements for recruitment automation and candidate matching. |

---

### 🔍 Skills & Job Taxonomy (4 tools)

| Tool | What It Does |
|------|-------------|
| `lookup_skill` | Returns authoritative detail for a known skill including description, all aliases, related skills, proficiency levels, and O\*NET/ESCO mappings. Use when you need the complete record rather than a ranked search. |
| `lookup_job_profile` | Returns authoritative detail for a known job profile including canonical title, SOC/O\*NET code, job family, typical required and preferred skills, salary bands, and work context. |
| `autocomplete_skill` | Accepts a partial skill string (min 2 chars) and returns up to 10 ranked autocomplete suggestions with canonical names and categories. Prevents free-text entry errors and keeps skill data clean at point of entry. |
| `autocomplete_job_profile` | Accepts a partial job title string and returns ranked autocomplete suggestions with canonical titles and job families. Ensures job titles map to taxonomy profiles from the moment a recruiter starts typing. |

---

### 🧹 Redaction, Documents & Utilities (7 tools)

| Tool | What It Does |
|------|-------------|
| `redact_resume` | Redacts personally identifiable information from candidate profiles to support anonymized review, bias-aware screening, compliance workflows, and audit logs. Configurable redaction scope. Idempotent. |
| `reformat_resume_with_template` | Accepts any structured candidate profile and applies one of six branded templates (TM001–TM006) to produce a consistently formatted output document in PDF, DOCX, RTF, or HTML. Eliminates manual reformatting and enforces brand consistency at scale. |
| `convert_document_format` | Accepts a document as base64 or URL and converts between PDF, DOCX, RTF, HTML, and plain text. Preserves formatting fidelity. Useful as a pre-processing step before data extraction on non-standard file types. |
| `tag_entities` | Takes already-extracted HR text and annotates it by wrapping each recognized entity in a structured XML-style label inline — covering 10+ HR-specific entity types including job title, skill, city, degree, organization, person name, state, country, date, and year. |
| `extract_contacts` | Identifies and structures names, emails, phone numbers, LinkedIn URLs, and addresses with field-level confidence scores from candidate records, emails, or documents. Safe for GDPR/CCPA workflows. |
| `geolocate` | Converts partial or informal location text into structured city, state, country, ISO codes, latitude, and longitude. Enables radius-based candidate and job search and supports workforce planning analytics. |
| `classify_job_zone` | Reads the job profile from a resume or job description and returns its O\*NET Job Zone (1–5) based on education, experience, and training criteria. Enables candidate-to-role fit filtering, compensation benchmarking, and over/under-qualification flagging. |

---

### 🔎 Search & Matching (3 tools)

| Tool | What It Does |
|------|-------------|
| `score_resume_against_jd` | Accepts one resume and one Job Description (no index required) and returns an overall match score, dimension scores, skill gap list, and natural-language explanation. Bias-controlled and audit-ready. |
| `find_matches_in_index` | Accepts a resume or Job Description as input and returns the top-N most similar documents from the indexed corpus ranked by semantic similarity. No index setup required for the input document. |
| `search_indexed_documents` | Accepts a query string and returns ranked document references from the tenant's pre-populated index. Supports Boolean and semantic search modes. Requires documents to be indexed before use. |

---

### 🤖 AI Agents (20 tools)

| Tool | Agent | What It Does |
|------|-------|--------------|
| `analyze_hr_call` | HR Call Analyzer Agent | Analyze recruiting calls for insights, sentiment, and action items. |
| `distribute_job` | Job Distribution Agent | Publish job postings across hiring channels automatically. |
| `match_end_to_end` | End-to-End Matching Agent | Run complete candidate and job matching workflows. |
| `map_job_to_skills` | Job-to-Skill Mapping Agent | Map job descriptions to required and preferred skill taxonomies. |
| `validate_skills` | Skill Validation Agent | Validate and normalize ATS skill data against RChilli Taxonomy 3.x. |
| `prescreen_candidate` | Candidate Prescreening | Prescreen a candidate against role-specific criteria. |
| `generate_jd` | Job Description Builder | Create job descriptions from role inputs. |
| `generate_interview_questions` | Interview Question Generation | Generate interview questions from job and candidate data. |
| `analyze_skill_gap` | Skill Gap Analysis | Identify gaps between a profile and a target role. |
| `recommend_learning_path` | Learning Path Recommendations | Recommend learning paths based on skill gaps. |
| `detect_bias` | Bias Detection Agent | Detect biased hiring language in Job Descriptions and screening criteria. |
| `augment_profile` | Profile Augmentation Agent | Enrich candidate profiles from available data sources. |
| `agent_matching` | Matching Agent | Matches a candidate against a job description and returns an explainable fit score, matched skills, gaps, and recommendations. |
| `normalize_candidate_data` | Candidate Data Normalization Agent | Standardize candidate data across multiple ATS systems. |
| `screen_application_batch` | Prescreening Agent | Screen a batch of candidates and recommend next actions. |
| `detect_resume_anomalies` | Integrity Detection Agent | Flag suspicious claims or inconsistencies in candidate profiles. |
| `prescreen_ai_agent` | Pre-Screening AI Agents | Automate first-round candidate screening with AI-led audio interviews and Oracle/ATS record write-back. |
| `normalize_hr_data_with_lov` | Normalize HR Data with LOV | Map raw HR data values to standardized List of Values entries. |
| `map_candidate_skills` | Skill Mapping Agent | Extract, cluster, normalize, and infer a candidate’s skill profile from resume text. |
| `query_skill_graph` | Skill Adjacency Graph Agent | Find related skills, identify skill gaps, assess near-fit candidates, and recommend learning paths. | 

## 📦 Response Format

Every tool returns the same consistent envelope:

```json
{
  "success": true,
  "data": { },
  "meta": {
    "trace_id": "3e4f1a2b-uuid",
    "latency_ms": 312.45
  }
}
```

Errors return `success: false` with a structured `error` object:

```json
{
  "success": false,
  "error": {
    "code": "RCHILLI_API_ERROR",
    "message": "Invalid credentials",
    "retryable": false
  },
  "meta": {
    "trace_id": "3e4f1a2b-uuid",
    "latency_ms": 88.12
  }
}
```

`retryable: true` is set for rate-limit and transient errors so your
agent can automatically retry without human intervention.

---

## Frequently Asked Questions

**What AI clients work with RChilli MCP Hub?**
Any MCP-enabled client — Claude Desktop, Claude.ai, Cursor, Cline,
Windsurf, Zed, and VS Code. Any client supporting Streamable HTTP works.

**Do I need an API key?**
No API key required. RChilli MCP Hub uses OAuth 2.1. Enter your RChilli
Client ID and Secret once — the full login flow opens automatically.

**How do I get RChilli credentials?**
Sign up or log in at https://myaccount.rchilli.com/account/login and
get your Client ID and Secret from the dashboard.

**What file formats are supported for resume parsing?**
PDF, DOCX, DOC, RTF, HTML, and 15+ additional formats across 40+ languages.

**Is my resume data stored by the MCP server?**
No. The MCP layer does not store any resume or candidate data. All data
in transit is encrypted via TLS 1.3.

**Can I use this for server-to-server integrations?**
Yes. OAuth 2.0 client_credentials grant is supported for automated
pipelines — no browser login needed.

**What happens if a tool call fails?**
All errors return a structured JSON envelope with a code, message, and
retryable flag. Retryable is true for rate-limit and transient errors.

**Does it support batch processing?**
Yes. `extract_resume_data` supports batch mode to process legacy databases
or migration backlogs overnight at scale.

---

## 🔑 Get Access

RChilli MCP Hub requires a valid RChilli account with an active plan.

| Resource | Link |
|----------|------|
| Sign up / Login | https://myaccount.rchilli.com/account/login |
| Plans & Pricing | https://docs.rchilli.com/kc/Plan_Subscription_and_cost |
| Documentation | https://docs.rchilli.com/kc/index.html |
| Help Desk | https://help.rchilli.com/hc/en-us |
| Smithery Listing | https://smithery.ai/servers/dev-ko1g/rchilli |
| Support | support@rchilli.com |

---

<div align="center">
  <sub>
    Built on 15+ years of HR data intelligence. Trusted by organizations worldwide.
    <br/>
    <a href="https://www.rchilli.com">rchilli.com</a>
    &nbsp;·&nbsp;
    <a href="https://mcp.rchilli.ai">mcp.rchilli.ai</a>
    &nbsp;·&nbsp;
    <a href="https://smithery.ai/servers/dev-ko1g/rchilli">Smithery</a>
  </sub>
</div>
