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
    {
      id: 2,
      title: "A beginner's guide to: The gym",
      excerpt: "",
      date: "Jan 05, 2025",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "beginner-gym-workouts",
      content: `Going to the gym is a form of resistance training. I.e., applying tension to your muscles causes micro-tears in the fibers, helping them grow bigger and stronger - hence the term building muscle!

## What workout should I follow?

The best workout for you will be the one that fits into your schedule. [Studies](https://weightology.net/the-members-area/evidence-based-guides/set-volume-for-muscle-size-the-ultimate-evidence-based-bible/) have shown that the most optimal amount of time is 10-20 sets per muscle group each week. Based off of that, here are some general guidelines to follow based on how often you can go to the gym:

- **1 - 2 days a week:** Full body workouts
- **3 - 4 days a week:** 2 x Upper / Lower days
- **4+:** Push Pull Legs, a Bro Split, etc.

In terms of what to do in the workout, there are heaps you can find online (e.g., [here](https://www.hevyapp.com/pplul-split/)). Aim to spend a maximum of 1 hour in the gym. For each exercise, aim for 3-4 sets and 8-12 reps.

## Progressive overload

It's simple - the more stimulus your muscle gets, the more strength required and muscle growth. Total load is calculated by multiplying the weight with the number of sets and reps. Every week, you should be aiming to increase this number!

**Remember:**

<div style="text-align: center; font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0; font-family: monospace;">
Total Load = Weight lifted × number of sets × number of reps per set
</div>

Get into the habit early of tracking your workouts - either via apps such as [Strong](https://www.strong.app/), the Notes app on your phone or a physical notebook.

## How many calories does a 1 hour workout burn?

It all depends on the person and intensity of the workout, but as an average rule of thumb an hour workout will be around 200 - 450 calories.

## How long should I rest in between sets?

[Studies](https://pubmed.ncbi.nlm.nih.gov/19691365/) have shown the following:

- **Muscular strength:** 3 - 5 minutes
- **Muscular hypertrophy (growth):** 30-60 seconds
- **Muscular endurance:** 20 seconds to 1 minute

Personally, I rest until I feel like I am ready to push the muscle again. I've found that the sweet spot for me to finish my workout within the hour with 3-4 exercises is to rest for 2 minutes in between each set.

## Other helpful tips

**Find a partner who is also looking to start.** Not only can you keep each other accountable and consistent, but you will learn more by working together and sharing what you learn.

**If you are more socially anxious:** 5PM (after work / school) is typically the busiest time. If your gym is 24 hours, you can go towards the end of the day or the middle of the day. Slowly you will realise that everyone's there to work on themselves rather than judge you!

**Pick your outfit / playlist the night before** - remove barriers to not going and just put your kit on and go! Even if you're not feeling like it - the cognitive benefits / consistency goes a long way!

---

Always remember: you can't out train a bad diet - if your goal is weight loss, make sure you are in a caloric deficit that matches your goals.
`,
    },
    {
      id: 3,
      title: "A beginner's guide to: Calorie density and food choices",
      excerpt: "",
      date: "Feb 10, 2025",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "calorie-density-food-choices",
      content: `Whilst one part of the weight loss equations is being in a caloric deficit, this doesn't mean that you have to starve yourself! It's not just how much to eat, but what are you actually eating?

Ask yourself this:

![Calorie density comparison](/calorie-substitution.jpg)

**What would make you feel more physically full? A handful of nuts, or 2 bowls of strawberries?**

Making these informed switches will make your weight loss journey 100x easier and won't leave you feeling starved!

For a 500 calorie daily deficit - it's as easy as making the following substitutions:

> Swap rice for cauliflower rice, swap soda for diet soda, remove the dressing from your salad and replace the protein with a lean source of protein!

## Here are some of my personal favourite sources of macronutrients

*(Note: the values provided are estimates only)*

### Proteins (1g of protein = 4 calories)

**Less calorically dense:**

- Cottage Cheese: 0.9 calories / gram
- Greek Yoghurt: 0.59 calories / gram
- Chicken Breast: 1.65 calories / gram
- Ham / processed meats: 1.4 calories / gram
- Lean turkey: 1.2 calories / gram
- Lean ground beef: 1.8 calories / gram
- Eggs: 1.55 calories / gram
- White fish e.g., Tilapia: 1.2 calories / gram

**More calorically dense:**

- Beef: 2.7 calories / gram
- Salmon: 2.3 calories / gram

### Carbs (1g of carbs = 4 calories)

**Less calorically dense:**

- Pumpkin: 0.4 calories / gram
- Potato: 0.77 calories / gram
- Sweet Potato: 0.86 calories / gram

**More calorically dense:**

- Oats: 3.8 calories / gram
- Rice (cooked): 1.3 calories / gram
- Pasta: 1.6 calories / gram

### Fats (1g of fat = 9 calories)

**Less calorically dense:**

- Salmon, Eggs, Red Meat provide a healthy source of fats (I typically get my fats from my fattier sources of proteins)
- PB2 (Peanut Butter): 3.8 calories / gram

**More calorically dense:**

- Avocados: 1.6 calories / gram
- Butter / Oil: 9 calories / gram
- Nut Butters: 6 calories / gram

## Some other helpful tips / tricks

### Prioritise Protein

**Why it helps:**
- Keeps you feeling full longer
- Has a higher thermic effect (your body burns more calories digesting it)
- Aim for 1g of protein per lb of body weight
- Still need carbs for energy and fats for hormone regulation

### Fruits and Vegetables

**High volume, low calories** - perfect for feeling satisfied. Some of my favourites:
- Mushrooms
- Broccoli  
- Cauliflower

### Artificial Sweeteners

**Safe and effective:**
- No long-term negative side effects shown in studies
- Great for curbing sweet cravings
- Can save 150+ calories (e.g., Coke Zero instead of regular Coke)
- Available in: No-sugar Jello, Ice-cream, Maple Syrup, and more

### Sauces / Dressing

**Watch out:** Can add 150+ calories to a salad without you noticing.

**Better alternatives:**
- Hot Sauce
- Nandos sauce
- Fat-Free Mayo
- Soy sauce
- Or simply ask for sauce on the side!

**Pro tip:** Low calorie recipes and cookbooks like [this one](https://www.gregdoucette.com/collections/books) can help you get creative with your substitutes!

---

**Remember:** To help yourself feel more full on a calorie deficit - prioritise foods which are less calorically dense!
`,
    },
  ]
  
  export function getBlogBySlug(slug: string): Blog | undefined {
    return mockBlogs.find((blog) => blog.slug === slug)
  }
  
  export function getAllBlogSlugs(): string[] {
    return mockBlogs.map((blog) => blog.slug)
  }
  