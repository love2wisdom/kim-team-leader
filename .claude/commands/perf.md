---
description: Performance optimization with measurement-driven approach
---

# Perf Command

**Purpose**: Performance optimization based on metrics and profiling

**Auto-Activations**:
- Persona: performance (primary)
- MCP: Playwright (performance metrics), Sequential (analysis)
- Flags: --think, --validate

**Arguments**:
- `$ARGUMENTS` - Performance focus or target
- `@<path>` - Specific code to optimize
- `--type <perf>` - load-time | runtime | memory | bundle | network | all
- `--profile` - Run performance profiling
- `--benchmark` - Create performance benchmarks

**Performance Workflow**:
1. 📊 **Baseline Measurement**: Establish current performance metrics
2. 🔍 **Profiling**: Identify bottlenecks and hot paths
3. 🎯 **Critical Path Analysis**: Focus on highest-impact areas
4. 🛠️ **Optimization**: Apply targeted improvements
5. ✅ **Validation**: Measure improvements with metrics
6. 🧪 **Regression Testing**: Ensure no performance regressions
7. 📝 **Documentation**: Document optimizations and benchmarks

**Performance Budgets**:
- **Load Time**: <3s on 3G, <1s on WiFi
- **API Response**: <200ms for endpoints, <500ms for complex queries
- **Bundle Size**: <500KB initial, <2MB total
- **Memory**: <100MB mobile, <500MB desktop
- **CPU Usage**: <30% average, <80% peak for 60fps
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

**Optimization Strategies**:

### Frontend Performance
- Code splitting and lazy loading
- Image optimization and lazy loading
- Caching strategies (service workers, HTTP caching)
- Bundle size reduction (tree shaking, minification)
- Critical CSS and resource hints
- Virtual scrolling for long lists

### Backend Performance
- Database query optimization (indexing, query analysis)
- Caching (Redis, in-memory, CDN)
- Connection pooling
- Async processing and queue systems
- Load balancing and horizontal scaling
- API response optimization (compression, pagination)

### Network Performance
- CDN utilization
- HTTP/2 and HTTP/3
- Resource compression (gzip, brotli)
- Request batching and multiplexing
- Prefetching and preloading

**Priority Hierarchy**:
1. **Measure First**: Profile before optimizing
2. **Critical Path**: Optimize highest-impact bottlenecks
3. **User Experience**: Focus on perceived performance
4. **Avoid Premature Optimization**: Data-driven decisions only

**Profiling Tools**:
- Chrome DevTools Performance tab
- Lighthouse audits
- WebPageTest
- Bundle analyzer
- Memory profiler
- Network waterfall analysis

**Quality Standards**:
- Measurement-based optimization
- User-focused improvements
- No functional regressions
- Performance within budgets

**Examples**:
- `/perf @src/components/Dashboard --type load-time --profile`
- `/perf --type bundle --benchmark`
- `/perf @api/users --type runtime --profile`
- `/perf --type all @app` - Comprehensive performance audit

Execute performance optimization following SuperClaude performance persona with measurement-first approach.
