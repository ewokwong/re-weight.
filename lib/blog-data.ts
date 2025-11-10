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
      excerpt: "",
      date: "Nov 9, 2024",
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
    {
      id: 1,
      title: "A beginner's guide to: Weight loss and TDEE",
      excerpt: "",
      date: "Dec 15, 2024",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "understanding-tdee",
      content: `
Total Daily Energy Expenditure (TDEE) refers to the amount of energy that your body expends in a day. Eat more than your TDEE, you will store the excess energy or "gain fat". The same goes for vice versa: if you eat less than your TDEE, your body will draw energy from your body and you will "lose fat".

## The Problem with Common Calorie Counters

Your TDEE is made up of many [factors](https://www.ithrivein.com/blog/tdee-everything-you-need-to-know), and many common calorie counters such as My Fitness Pal (MFP), Lose It, Noom, etc. utilise simple questionnaires and predictive [equations](https://reference.medscape.com/calculator/846/mifflin-st-jeor-equation)) which lead to largely undercut figures. This leaves many people starving and losing weight way too quickly - which will ultimately either cause them to be stuck in a weight plateau as their body metabolically adapts or frustratingly gaining it all back due to insatiable hunger.

At re:weight, we are changing this.

## So how can I actually calculate my TDEE?

The best way to find your TDEE is to track these 3 things:

- Your daily and weekly caloric intake
- Your weekly weight average
- [OPTIONAL] Your activity level (daily number of steps)

Over a week, track your normal calorie intake and watch your weight fluctuations. From there, if your weight has stayed relatively consistent, take your weekly caloric intake and divide it by 7 to get your TDEE.

Remember:

<div style="text-align: center; font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0; font-family: monospace;">
TDEE(kcals) = Total Weekly Caloric Intake / 7 days
</div>

From there, you can either:

- Maintain your TDEE
- Drop your calories (to lose weight)
- Up your calories (to gain weight)

Don't worry too much about daily fluctuations in your weight which can vary widely due to water retention difference which can cause up to a [1-2kg daily change]((https://health.clevelandclinic.org/weight-fluctuations))!

## Weight Loss Recommendations

For weight loss, we suggest starting with a 250 calorie deficit per day. This should have you losing around 0.25kg a week. At max, studies recommend losing 0.5kg a week, or a 500 calorie deficit per day to keep weight loss sustainable.

## How can I lose all of the fat around my stomach?

You can't. You can't pick and choose, or "spot-reduce" fat. The only way to reduce those seemingly stubborn regions of lower belly fat is to reduce your total body weight % and it will come off as a byproduct. Women tend to store fat in the hips, thighs and lower abdomen whilst men tend to store fat primarily in the [abdomen](https://www.erchonia.com/blog/how-men-and-women-store-fat-differently/).

## Setting Realistic Body Fat Goals

When deciding on your weight loss goals, it is also important to set realistic body fat % goals. 

You may want to get to < 10% body fat, but consider the [effects](https://breakbingeeating.com/dangers-of-dieting/#Medical_Physiological_Dangers) that come with it:

- Difficulty sleeping
- Decreased sex drive
- Dullness of life
- Loss of period (for women)
- And many more...

Do you think that is sustainable? Look at some of the top athletes in the world. Instead of celebrating the chiseled body - we should instead be celebrating the functional 15-20% which allows you to enjoy your life and feel strong and confident in yourself.
`,
    },
  ]
  
  export function getBlogBySlug(slug: string): Blog | undefined {
    return mockBlogs.find((blog) => blog.slug === slug)
  }
  
  export function getAllBlogSlugs(): string[] {
    return mockBlogs.map((blog) => blog.slug)
  }
  