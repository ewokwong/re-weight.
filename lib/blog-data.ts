export interface Blog {
    id: number
    title: string
    excerpt: string
    date: string
    views: number
    likes: number
    comments: number
    slug: string
    content: string
  }

/**
 * Blog Content Formatting Guide (Markdown):
 * 
 * Headers:
 *   # Main Heading (H1) - Large with bottom border
 *   ## Subheading (H2) - Medium size
 *   ### Sub-subheading (H3) - Smaller size
 *   #### H4, ##### H5, ###### H6
 * 
 * Text Formatting:
 *   **bold text** or __bold text__
 *   *italic text* or _italic text_
 *   ***bold and italic***
 * 
 * Lists:
 *   Bullet Points:
 *     - First item
 *     - Second item
 *     - **Bold item**
 *   
 *   Numbered Lists:
 *     1. First point
 *     2. Second point
 *     3. **Bold point**
 * 
 * Links:
 *   [Link text](https://example.com)
 *   [Link with title](https://example.com "Title")
 * 
 * Code:
 *   Inline code: `code here`
 *   Code block:
 *   ```
 *   code block
 *   ```
 * 
 * Blockquotes:
 *   > This is a quote
 *   > Can span multiple lines
 * 
 * Horizontal Rule:
 *   ---
 *   or
 *   ***
 * 
 * Paragraphs:
 *   Separate paragraphs with a blank line
 * 
 * Example:
 *   content: `# My Article Title
 * 
 *   This is a paragraph with **bold text** and *italic text*.
 * 
 *   ## Section Heading
 * 
 *   - First bullet point
 *   - Second bullet point with **bold**
 * 
 *   1. Numbered item one
 *   2. Numbered item two
 * 
 *   [Learn more](https://example.com)`
 */
  
  export const mockBlogs: Blog[] = [
    {
      id: 0,
      title: "What is re:weight?",
      excerpt: "Reshaping the way society thinks about weight loss",
      date: "Nov 9, 2025",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "what-is-reweight",
      content: `We're frustrated with the current dieting culture. Keto, carnivore, intermittent fasting - it's overcomplicated. Don't even get us started on calorie counting. Prescribing 1800 calories to everyone is a dangerous path to eating disorders, body dymorphia and ruined metabolisms.
      
We've seen countless clients stuck in this trap of yo-yo dieting: working hard at the gym, eating clean, then gaining it all back in a week. They're stuck in this never-ending cycle - and it begins to take over their life. What's the point of losing weight if you can't sustain it?

Living healthy and happy should never be this way. Imagine if you could put all of that mental energy into living the life you want?

That's why we're shifting from **Weight Loss** to **Weight Management**.

Our goal is to help everyone build systems that allow them to live the life they want - without being held back by this fear of gaining weight.
`,
    },
  ]
  
  export function getBlogBySlug(slug: string): Blog | undefined {
    return mockBlogs.find((blog) => blog.slug === slug)
  }
  
  export function getAllBlogSlugs(): string[] {
    return mockBlogs.map((blog) => blog.slug)
  }
  