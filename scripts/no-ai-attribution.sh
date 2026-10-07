#!/bin/sh
# Rejects AI co-author or attribution lines in commit messages.
# Usage: no-ai-attribution.sh <file>   or pipe messages on stdin.
PATTERN='^co-authored-by:.*(claude|anthropic|copilot|cursor|openai|chatgpt|gpt|gemini|windsurf|codeium|devin)|generated with'
if grep -qiE "$PATTERN" "${1:--}"; then
  echo "Rejected: AI attribution lines (Co-authored-by: <AI>, 'Generated with ...') are not allowed."
  exit 1
fi
