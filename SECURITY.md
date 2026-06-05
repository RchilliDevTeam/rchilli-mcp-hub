# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in RChilli MCP Hub,
please report it responsibly.

**Do not** open a public GitHub issue for security vulnerabilities.

**Email:** support@rchilli.com  
**Response time:** Within 48 hours  
**Disclosure policy:** Coordinated disclosure after fix is deployed

---

## Security Practices

### Authentication
- OAuth 2.1 Authorization Code + PKCE (S256) for all interactive
  clients — no API keys sent in URLs or query strings
- Bearer tokens validated server-side on every tool call
- Access tokens expire after 1 hour
- Refresh tokens expire after 30 days
- Tokens can be revoked instantly from your RChilli account dashboard

### Data in Transit
- All connections encrypted via TLS 1.3
- HTTPS enforced on the production endpoint
- No plaintext communication supported

### Data Handling
- The MCP layer does not store resume or candidate data
- Tool inputs and outputs are not logged beyond trace ID and latency
- No third-party data sharing

### Infrastructure
- Hosted on GCP — ISO 27001 compliant infrastructure
- DNS rebinding protection enabled
- Rate limiting applied per client key

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | ✅ Yes    |

---

## Contact

- **Security issues:** security@rchilli.com  
- **General support:** support@rchilli.com  
- **Help desk:** https://help.rchilli.com/hc/en-us
