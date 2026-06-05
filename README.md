# RChilli MCP Hub — The HR Intelligence Layer for AI Agents

Connect AI agents to RChilli's enterprise-grade HR APIs with zero
boilerplate. Parse resumes and job descriptions, enrich skills with
the RChilli Taxonomy (ONet/ESCO), redact bias and PII, reformat and
convert documents, and run explainable candidate-to-job matching —
all through a single MCP server.

**Production endpoint:** `https://mcp.rchilli.ai/mcp`  
**Transport:** Streamable HTTP · **MCP Spec:** 2025-03-26  
**Protocol:** JSON-RPC 2.0  
**All tools are read-only.**

---

## Authentication

RChilli MCP Hub uses **OAuth 2.1 Authorization Code + PKCE (S256)**
for interactive clients (Claude, Cursor, Cline) and **OAuth 2.0
client_credentials** for server-to-server integrations.

### How the flow works

```
Your AI Client               MCP Server              RChilli Auth
─────────────────────   ──────────────────────   ──────────────────
1. Discover OAuth  →    /.well-known/
                         oauth-authorization-server
                         returns issuer, authorize
                         and token endpoints

2. Open login page →    GET /authorize
                         renders RChilli login

3. User logs in    →    POST /authorize      →   validates credentials
                         with client_id &         returns auth code
                         client_secret
                         ← 302 redirect with code

4. Exchange code   →    POST /token
   + PKCE verifier       verifies PKCE,
                         returns Bearer token

5. Every tool call →    Authorization: Bearer <token>
                         server injects userkey
                         and subuserid automatically
                         → tool runs with your
                           credentials
```

**What this means for you:**
- The full OAuth flow opens automatically — no tokens to copy or paste
- Access tokens refresh automatically every hour
- Sessions stay active for 30 days via refresh token

### Server-to-server (client_credentials)

For automated pipelines, send `grant_type=client_credentials` with
your `client_id` and `client_secret` directly to `POST /token`.
A Bearer token is returned immediately — no browser login needed.

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

| Field         | Value                         |
|---------------|-------------------------------|
| Server URL    | `https://mcp.rchilli.ai/mcp` |
| Client ID     | Your RChilli Client ID        |
| Client Secret | Your RChilli Client Secret    |

### Cursor / Cline / VS Code

Set transport to **Streamable HTTP** and URL to
`https://mcp.rchilli.ai/mcp`. The OAuth popup opens automatically
on first connect and credentials are stored for reuse.

### Smithery CLI

```bash
npm install -g smithery
smithery mcp add dev-ko1g/rchilli
```

---

## Tools — 17 Total

`userkey` and `subuserid` are injected automatically from your
Bearer token — you never need to pass them manually.

---

### Resume & Job Description Parsing (3 tools)

**`parse_resume`**  
Extracts 200+ normalized fields — name, contact, skills, work
history, education, certifications, languages, and a
taxonomy-enriched job profile — from a resume supplied as plain
text. Turns an unstructured CV into clean, consistent JSON the
agent can reason over.  
Use when you have resume content as text and need structured output.  
Do not use for job descriptions — use `parse_job_description`.

---

**`parse_resume_from_url`**  
Same deep extraction as `parse_resume`, but the server fetches the
file directly from a public URL. Supports PDF, DOCX, RTF, and 15+
formats. Ideal when a resume lives in cloud storage or an ATS link.  
Use when you have a public URL pointing to a resume file.  
Do not use for private or authenticated URLs.

---

**`parse_job_description`**  
Parses a job description into structured data — required and
preferred skills, experience range, salary, qualifications, and
taxonomy mappings. Gives agents a precise picture of what a role
actually demands instead of a wall of prose.  
Use when you have a job description as text and need structured
role data.  
Do not use for resumes — use `parse_resume`.

---

### Skills & Job Taxonomy (4 tools)

**`lookup_skill`**  
Returns authoritative, curated detail for any skill — definition,
aliases, related skills, ontology, and ONet/ESCO codes. Grounds
skill reasoning in a standardized taxonomy rather than the model's
memory.  
Use when you need verified, structured information about a specific
skill.

---

**`lookup_job_profile`**  
Returns canonical detail for a role — required and related skills,
career level, ontology, and ONet/ESCO mappings. Answers "what does
this role need" and "skills to become X" from real taxonomy data.  
Use when you need verified information about a specific job profile
or title.

---

**`autocomplete_skill`**  
Returns skill name suggestions for a partial keyword across 10,000+
curated skills. Keeps free-text inputs aligned to the canonical
taxonomy.  
Use when the user is typing a skill name and you need suggestions.

---

**`autocomplete_job_profile`**  
Returns job profile name suggestions for a partial keyword across
10,000+ curated job titles. Powers fast disambiguation and input
alignment.  
Use when the user is typing a job title and you need suggestions.

---

### Redaction, Documents & Utilities (7 tools)

**`redact_resume`**  
Masks or removes unconscious-bias and PII fields — name, photo,
age, gender, contact details — to produce a blind, bias-free
version for sharing with hiring managers. Field selection and
masking style are configurable for compliant, fair-hiring workflows.  
Use when you need to anonymise a resume before sharing it.

---

**`reformat_resume_with_template`**  
Restyles any resume into a clean, branded template (TM001–TM006)
and outputs PDF, DOCX, RTF, or HTML. Standardizes candidate
presentation so every submission looks consistent and professional.  
Use when you need to convert a resume into a specific styled
format.

---

**`convert_document_format`**  
Converts a resume document between formats — DOCX to PDF, RTF to
HTML, and more — with optional face-image detection. Normalizes
mixed candidate files before storage or sharing.  
Use when you need to change the file format of a document.

---

**`extract_named_entities`**  
Tags named entities — job titles, skills, cities, degrees, and
organizations — with their positions, from any free text. A
lightweight way to pull structured signals out of notes, snippets,
or partial documents.  
Use when you have unstructured HR text and need entities tagged.

---

**`extract_contact_info`**  
Pulls contact details — name, email, phone, address, city, state,
country, website — out of free text. More dependable than ad-hoc
parsing when you just need to reach a candidate.  
Use when you have unstructured text and need contact details
extracted.

---

**`geocode_locations`**  
Resolves latitude and longitude for one or more locations, or for
the locations inside parser output. Enables distance and radius
logic, mapping, and location-aware matching.  
Use when you need coordinates for candidate or job locations.

---

**`determine_job_zone`**  
Determines the O*NET Job Zone level (1–5) — how much education and
preparation a role requires — for a resume or JD. Useful for
leveling candidates and gauging role seniority objectively.  
Use when you need to assess how senior or preparation-intensive a
role is.

---

### Search & Matching (3 tools)

**`score_resume_against_jd`**  
Produces an explainable one-to-one fit score between a single
resume and a single JD, with field-level evidence — no prior
indexing required. The fastest way to answer "how well does this
candidate match this role, and why."  
Use when you have one resume and one JD and need a match score.  
Do not use for matching against a large index — use
`find_matches_in_index`.

---

**`find_matches_in_index`**  
Ranks an already-indexed corpus of resumes or JDs against a source
document and returns the best matches with scores. Use it to
shortlist top candidates for a job from your existing talent pool.  
Use when you have an indexed talent pool and need ranked matches
for a new document.

---

**`search_indexed_documents`**  
Runs a keyword search across your indexed resumes or JDs and
returns matching documents. A quick way to find candidates or roles
in your pool by skill, title, or term.  
Use when you need to find documents in your index by keyword.

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

Errors return `success: false` with an `error` object containing
`code`, `message`, and `retryable` (`true` for rate-limit and
transient errors, `false` for invalid credentials or bad input).

---

## Coming Soon

AI Agent tools — Interview Question Generator, JD Generator,
Skill-Gap Analysis, Bias Detection, and Learning Path.

---

## Get Access

RChilli MCP Hub requires a valid RChilli account with an active plan.

- **Sign up / Login:**  https://myaccount.rchilli.com/account/login
- **Plans & Pricing:**  https://docs.rchilli.com/kc/Plan_Subscription_and_cost
- **Documentation:**    https://docs.rchilli.com/kc/index.html
- **Help Desk:**        https://help.rchilli.com/hc/en-us
- **Support:**          support@rchilli.com


Built on 15+ years of HR data intelligence.
Trusted by organizations worldwide.
