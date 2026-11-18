/**
 * RChilli MCP Hub OpenClaw integration.
 *
 * The MCP server is contributed declaratively through mcpServers in
 * openclaw.plugin.json; no duplicate tool registration or secret handling
 * occurs here. OpenClaw owns OAuth and runtime tool discovery.
 */
export default {
  id: "rchilli-mcp-hub",
  name: "RChilli MCP Hub",
  description:
    "Connect RChilli HR intelligence tools to OpenClaw through OAuth-enabled remote MCP.",
  register() {
    // Intentionally empty: remote MCP tools come from the manifest definition.
  },
};
