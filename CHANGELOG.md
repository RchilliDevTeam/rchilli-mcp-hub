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
- Streamable HTTP transport — MCP Spec 2025-11-26
- Auto-injection of `userkey` and `subuserid` from Bearer token
- Consistent `{ success, data, meta }` response envelope
- Listed on Smithery at smithery.ai/servers/dev-ko1g/rchilli
## v1.1.0 — October 2026

### Added
- Expanded RChilli MCP Hub from 17 to **32 production-ready MCP tools** across 5 categories.
- Added 14 AI Agent tools:
  - `analyze_hr_call` — HR Call Analyzer Agent
  - `match_end_to_end` — End-to-End Matching Agent
  - `map_job_to_skills` — Job-to-Skill Mapping Agent
  - `generate_jd` — Job Description Builder
  - `generate_interview_questions` — Interview Question Generation
  - `analyze_skill_gap` — Skill Gap Analysis
  - `recommend_learning_path` — Learning Path Recommendations
  - `detect_bias` — Bias Detection Agent
  - `normalize_candidate_data` — Candidate Data Normalization Agent
  - `screen_application_batch` — Prescreening Agent
  - `detect_resume_suspicion` — Integrity Detection Agent
  - `normalize_hr_data_with_lov` — Normalize HR Data with LOV
  - `skill_mapping` — Skill Mapping Agent
  - `analyze_skill_adjacency` — Skill Adjacency Graph Agent
- Updated README tool catalog, tool counts, and AI Agent descriptions.

