Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   GitHub MCP Server Setup Instructions   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. You need a GitHub Personal Access Token (PAT)."
Write-Host "   Go to: https://github.com/settings/tokens/new?description=mcp-server-github&scopes=repo,user,workflow"
Write-Host "   (Recommended scopes: repo, user, workflow)"
Write-Host ""
Write-Host "2. Once you have the token, open your MCP Client configuration."
Write-Host "   - For Claude Desktop: %APPDATA%\Claude\claude_desktop_config.json"
Write-Host "   - For custom clients: Locate your config file."
Write-Host ""
Write-Host "3. Add the following configuration (replace <YOUR_GITHUB_TOKEN> with your actual token):"
Write-Host ""
Get-Content -Path "..\mcp-config-snippet.json" | Write-Host -ForegroundColor Green
Write-Host ""
Write-Host "4. Restart your MCP Client to load the new server."
Write-Host ""
