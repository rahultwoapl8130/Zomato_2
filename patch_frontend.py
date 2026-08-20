import re

with open('e:/Zomato_2/restaurant-ai/src/app/restaurants/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_reviews = '''                {/* Aspect Analysis & AI Methodology */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {restaurant.aspectAnalysis && (
                    <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary fill-current" /> AI Aspect Analysis
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(restaurant.aspectAnalysis).map(([aspect, data]: [string, any]) => {
                          if (data.total === 0) return null;
                          const posPct = Math.round((data.pos / data.total) * 100);
                          const neuPct = Math.round((data.neu / data.total) * 100);
                          const negPct = Math.round((data.neg / data.total) * 100);
                          return (
                            <div key={aspect} className="space-y-1">
                              <div className="flex justify-between text-sm font-medium">
                                <span>{aspect}</span>
                                <div className="flex gap-3 text-xs text-muted-foreground">
                                  <span className="text-green-600">{posPct}% Pos</span>
                                  <span className="text-yellow-600">{neuPct}% Neu</span>
                                  <span className="text-red-600">{negPct}% Neg</span>
                                </div>
                              </div>
                              <div className="flex w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full" style={{ width: \\%\ }}></div>
                                <div className="bg-yellow-500 h-full" style={{ width: \\%\ }}></div>
                                <div className="bg-red-500 h-full" style={{ width: \\%\ }}></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* AI Methodology */}
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" /> How AI Analyzed Reviews
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> <b>Sentiment Classification:</b> Processed via LLM & heuristics (1-5★ scale mapping).</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> <b>Keyword/Aspect Extraction:</b> TF-IDF & Named Entity Recognition on {restaurant.totalReviews || 100} reviews.</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> <b>Dish Mention Detection:</b> Exact match counting on food vocabulary.</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> <b>Model:</b> LightGBM + Custom NLP Dictionary.</li>
                    </ul>
                  </div>
                </div>

                {/* Sentiment Trend Chart */}
                {restaurant.sentimentTrend && Object.keys(restaurant.sentimentTrend).length > 0 && (
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm mb-8">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" /> Review Sentiment Trend (By Year)
                    </h3>
                    <div className="flex gap-4 items-end h-32 pt-4">
                      {Object.entries(restaurant.sentimentTrend)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([year, data]: [string, any]) => {
                        const total = data.pos + data.neu + data.neg;
                        if (total === 0) return null;
                        const posHeight = Math.round((data.pos / total) * 100);
                        const negHeight = Math.round((data.neg / total) * 100);
                        return (
                          <div key={year} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative">
                            {/* Tooltip */}
                            <div className="absolute -top-12 bg-popover text-popover-foreground text-xs p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap">
                              {posHeight}% Positive<br/>{negHeight}% Negative
                            </div>
                            
                            <div className="w-full max-w-[40px] flex-1 bg-muted rounded-t-sm flex flex-col justify-end overflow-hidden">
                              <div className="w-full bg-green-500 transition-all" style={{ height: \\%\ }}></div>
                              <div className="w-full bg-red-500 transition-all" style={{ height: \\%\ }}></div>
                            </div>
                            <span className="text-xs font-bold text-muted-foreground">{year}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex gap-2 p-1 bg-muted rounded-lg overflow-x-auto w-full sm:w-auto">
                    {['All', 'Positive', 'Neutral', 'Negative'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setReviewFilter(filter)}
                        className={\px-4 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap \\}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="🔍 Search reviews..."
                      value={reviewSearch}
                      onChange={(e) => setReviewSearch(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="mb-4 text-sm text-muted-foreground flex justify-between">
                  <span>Showing {restaurant.reviews?.filter((r: any) => (reviewFilter === 'All' || r.sentiment === reviewFilter) && r.text.toLowerCase().includes(reviewSearch.toLowerCase())).length || 0} real reviews from Zomato dataset.</span>
                </div>
                
                <div className="space-y-4">
                  {restaurant.reviews && restaurant.reviews.length > 0 ? (
                    restaurant.reviews
                      .filter((r: any) => reviewFilter === 'All' || r.sentiment === reviewFilter)
                      .filter((r: any) => r.text.toLowerCase().includes(reviewSearch.toLowerCase()))
                      .map((review: any) => (
                      <div key={review.id} className="bg-card border border-border/50 rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-bold">{review.customerName}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-0.5 text-sm font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {review.rating} <Star className="w-3 h-3 fill-current" />
                            </div>
                            <div className={\px-2 py-0.5 rounded text-xs font-bold border \\}>
                              {review.sentiment}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          "{review.text}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center border border-border/50 rounded-xl bg-card/50">
                      <p className="text-muted-foreground">No reviews available for this restaurant yet.</p>
                    </div>
                  )}
                </div>'''

# We need to replace from <div className="mb-4 text-sm text-muted-foreground"> to the end of the reviews section.
# We'll use regex to find the block.

pattern = re.compile(r'                <div className="mb-4 text-sm text-muted-foreground">\s*Showing \{restaurant\.reviews\?\.[^}]+} real reviews from Zomato dataset\.\s*</div>\s*<div className="space-y-4">.*?</div>\s*</section>', re.DOTALL)

if pattern.search(content):
    content = pattern.sub(new_reviews + '\n              </section>', content)
    with open('e:/Zomato_2/restaurant-ai/src/app/restaurants/[id]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Frontend updated successfully!")
else:
    print("Pattern not found!")
