# Architecture Notes

## Current Direction
- business-grade product, not MVP framing
- login/signup first
- direct landing into collection dashboard
- bottom navigation for collection, marketplace, shared, profile
- valuation treated as first-class domain

## Recommended Backend Evolution
1. Start as modular monolith
2. Add queue for pricing refresh
3. Add websocket for chat
4. Split marketplace/pricing if scale requires it

