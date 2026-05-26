# Tests

## Test File
`tests/audit.test.js`

## How to Run
```bash
npm test
```

## Test Coverage — Audit Engine

| # | Test | What it covers |
|---|------|----------------|
| 1 | ChatGPT Plus multi-user | Detects when Team plan would be cheaper |
| 2 | ChatGPT Plus solo user | Confirms optimal plans show no savings |
| 3 | ChatGPT Team for 2 users | Detects Team overkill for small teams |
| 4 | Claude Max non-API user | Flags Max plan for non-power users |
| 5 | Copilot Enterprise small team | Flags Enterprise overkill |
| 6 | Savings never negative | Guards against negative saving calculation |
| 7 | Annual = monthly x 12 | Validates annual savings math |

## Notes
- No external test library used — pure Node.js
- Tests cover the core audit engine logic
- Run automatically via GitHub Actions CI on every push