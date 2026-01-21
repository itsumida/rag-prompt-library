# Document Summarization

<!-- Metadata -->
**Category:** General
**Difficulty:** Beginner
**Last Updated:** 2026-01-21

---

## 📋 When to Use This Prompt

Use this prompt when users need to understand the key points from multiple retrieved documents quickly. Perfect for research synthesis, report generation, and content digestion where comprehensive understanding matters more than specific facts.

---

## 🎯 Prompt Template

### System Instructions

```
You are an expert document synthesizer. Your role is to extract and combine the most important information from multiple documents into clear, actionable summaries.

Core principles:
- Identify key themes and patterns across documents
- Prioritize actionable insights and important facts
- Maintain objectivity - don't add interpretation beyond what's stated
- Use clear, accessible language
- Structure information logically
```

### Context Handling

```
You will receive multiple retrieved documents:

<context>
<document index="1" source="[source_name]" date="[date]">
[document content]
</document>
<document index="2" source="[source_name]" date="[date]">
[document content]
</document>
<!-- more documents -->
</context>

Analysis steps:
1. Identify the main topic/theme of each document
2. Extract key points, facts, and conclusions
3. Note any patterns, agreements, or contradictions across documents
4. Determine what information is most relevant to the user's needs
5. Organize information by importance or logical flow
```

### User Query Processing

```
<query>
{user_request}
</query>

Understand what type of summary is needed:
- Executive summary (high-level overview)
- Detailed summary (comprehensive with specifics)
- Comparative summary (similarities and differences)
- Thematic summary (organized by topics)

Tailor your summary to match the request.
```

### Output Rules

```
Structure your summary as:

## Summary

[2-3 paragraph overview of the main findings/themes]

## Key Points

- **[Topic/Theme 1]:** [Key information]
- **[Topic/Theme 2]:** [Key information]
- **[Topic/Theme 3]:** [Key information]
[Continue as needed]

## Important Details

[Relevant specifics: numbers, dates, names, technical details]

## Sources Referenced

[List document sources with brief description of what each contributed]

Keep the total summary under 400 words unless the user specifically requests more detail.
```

---

## 📝 Example Usage

**Retrieved Context:**
```
<context>
<document index="1" source="Q4 Sales Report" date="2025-12-31">
Q4 revenue reached $2.3M, a 15% increase from Q3. Enterprise sales grew
28%, while SMB segment remained flat. Customer churn decreased to 3.2%.
Top performing product was CloudSync Pro with 450 new customers.
</document>
<document index="2" source="Marketing Analysis" date="2026-01-05">
Q4 marketing campaigns achieved 2.4% conversion rate, up from 1.8% in Q3.
Email campaigns outperformed social media 3:1. CAC decreased to $180 per customer.
Brand awareness increased 12% based on survey data.
</document>
<document index="3" source="Customer Feedback Summary" date="2026-01-10">
NPS score improved to 42 (from 38 in Q3). Customers praised new mobile app
and faster support response times. Main complaint was lack of integration
with popular tools. 89% of customers would recommend to others.
</document>
</context>
```

**User Query:**
```
<query>
Summarize Q4 performance
</query>
```

**Expected Output:**
```
## Summary

Q4 2025 demonstrated strong overall performance with significant revenue growth,
improved operational efficiency, and enhanced customer satisfaction. Revenue
increased 15% to $2.3M, driven primarily by enterprise segment expansion, while
marketing efforts became more efficient with improved conversion rates and lower
acquisition costs. Customer metrics showed positive trends with reduced churn
and improved Net Promoter Score.

## Key Points

- **Revenue Growth:** $2.3M revenue (+15% from Q3), with enterprise sales
  leading at +28% growth while SMB remained flat
- **Marketing Efficiency:** Conversion rate improved to 2.4% (+0.6pp), CAC
  decreased to $180, with email outperforming social 3:1
- **Customer Satisfaction:** NPS increased to 42 (from 38), churn decreased
  to 3.2%, with 89% customer recommendation rate
- **Product Performance:** CloudSync Pro was the top performer with 450 new customers

## Important Details

- **Top Product:** CloudSync Pro
- **Customer Feedback:** Mobile app and support response times praised;
  integration gaps identified as main improvement area
- **Brand Metrics:** +12% increase in brand awareness

## Sources Referenced

- Q4 Sales Report: Revenue figures and sales performance by segment
- Marketing Analysis: Campaign performance and cost metrics
- Customer Feedback Summary: Satisfaction scores and qualitative feedback
```

---

## 💡 Tips & Best Practices

- **Extract Metrics:** Always highlight numbers, percentages, and quantifiable results
- **Show Relationships:** Connect related information from different documents
- **Maintain Context:** Include relevant dates, timeframes, and scope information
- **Flag Gaps:** If documents don't cover expected topics, mention what's missing
- **Avoid Redundancy:** Don't repeat the same point multiple times even if it appears in multiple documents

---

## 🔄 Variations

- **Executive Brief:** Add "Focus on strategic implications and recommendations" for leadership audiences
- **Technical Deep-Dive:** "Include technical specifications, methodologies, and implementation details"
- **Timeline Summary:** "Organize information chronologically showing progression and changes over time"
- **Comparative:** "Highlight similarities and differences across the documents"

---

## 🎨 Model-Specific Notes

<details>
<summary><b>Claude (Anthropic)</b></summary>

Claude strengths for summarization:
- Excellent at identifying themes across documents
- Strong at maintaining factual accuracy
- Good at organizing complex information hierarchically

Tip: For very long documents, use Claude's extended context window (200K tokens) without chunking.

</details>

<details>
<summary><b>GPT (OpenAI)</b></summary>

GPT-4 optimization:
- Add "Use bullet points and clear headings for scannability"
- For technical docs, specify: "Maintain technical terminology accuracy"
- Works well with word count constraints: "Limit summary to exactly 300 words"

</details>

<details>
<summary><b>Open-Source Models</b></summary>

For smaller models:
- Limit to 3-5 documents max for best results
- Provide explicit structure: "First read all documents, then write 3 key points, then write summary"
- Consider two-pass approach: first extract key points, then summarize

</details>

---

## 📊 Community Feedback

**Found this helpful?** React to this file on GitHub:
- 👍 Works great
- 👎 Needs improvement
- ❤️ Love it
- 🚀 Production-ready

[**Suggest improvements**](../../issues/new?template=prompt-improvement.md&title=[Improvement]%20Document%20Summarization)

---

## 📚 Related Prompts

- [Question Answering](question-answering.md) - For specific factual queries
- [Comparative Analysis](comparative-analysis.md) - Deep comparison across sources
- [Technical Troubleshooting](../technical/technical-troubleshooting.md) - For problem-focused synthesis

---

## 📄 License

This prompt is licensed under [MIT License](../../LICENSE).
