# Changelog

All notable changes to RChilli MCP Hub are documented here.

---

## v1.0.0 — June 2026

### Released
- 17 production-ready MCP tools across 4 categories
- Resume & Job Description Parsing — `parse_resume`, 
  `parse_resume_from_url`, `parse_job_description`
- Skills & Job Taxonomy — `lookup_skill`, `lookup_job_profile`,
  `autocomplete_skill`, `autocomplete_job_profile`
- Redaction, Documents & Utilities — `redact_resume`,
  `reformat_resume_with_template`, `convert_document_format`,
  `extract_named_entities`, `extract_contact_info`,
  `geocode_locations`, `determine_job_zone`
- Search & Matching — `score_resume_against_jd`,
  `find_matches_in_index`, `search_indexed_documents`
- OAuth 2.1 Authorization Code + PKCE (S256) authentication
- OAuth 2.0 client_credentials for server-to-server integrations
- Streamable HTTP transport — MCP Spec 2025-03-26
- Auto-injection of `userkey` and `subuserid` from Bearer token
- Consistent `{ success, data, meta }` response envelope
- Listed on Smithery at smithery.ai/servers/dev-ko1g/rchilli

### Coming Soon
- AI Agent tools — Interview Question Generator, JD Generator,
  Skill-Gap Analysis, Bias Detection, Learning Path
