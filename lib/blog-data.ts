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
      excerpt: "We're shifting from Weight Loss to Weight Management. Our goal is to help everyone build systems that allow them to live the life they want - without being held back by the fear of gaining weight.",
      date: "Nov 9, 2024",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "what-is-reweight",
      content: `We're frustrated with the current dieting culture. Keto, carnivore, intermittent fasting - it's overcomplicated. Don't even get us started on calorie counting. Prescribing 1800 calories to everyone is a dangerous path to eating disorders, body dysmorphia and ruined metabolisms.
      
We've seen countless clients stuck in this trap of yo-yo dieting: working hard at the gym, eating clean, then gaining it all back in a week. They're stuck in this never-ending cycle - and it begins to take over their life. What's the point of losing weight if you can't sustain it?

Living healthy and happy should never be this way. Imagine if you could put all of that mental energy into living the life you want?

That's why we're shifting from **Weight Loss** to **Weight Management**.

Our goal is to help everyone build systems that allow them to live the life they want - without being held back by this fear of gaining weight. Explore our guides below to get started on your sustainable weight management journey.

---

As always, seek a professional for professional advice if you're feeling stuck. Feel free to contact us if you don't know where to start.
`,
    },
    {
      id: 1,
      title: "A beginner's guide to: Weight loss and TDEE",
      excerpt: "Learn how to accurately calculate your Total Daily Energy Expenditure (TDEE) and why common calorie counters often underestimate your needs, leading to unsustainable weight loss.",
      date: "Dec 15, 2024",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "understanding-tdee",
      content: `<div style="background-color: rgba(0, 0, 0, 0.05); border-left: 4px solid #000; padding: 1rem 1.25rem 0.5rem 1.25rem; margin: 0 0 1.5rem 0; border-radius: 4px;">
<strong style="font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">Key Takeaways:</strong>
<ul style="margin: 0; padding-left: 1.5rem; list-style-type: disc;">
<li>TDEE is the amount of energy your body expends daily - eat more than TDEE to gain, less to lose</li>
<li>Common calorie counters underestimate TDEE, leading to unsustainable weight loss</li>
<li>Track weekly calories and weight average to calculate your true TDEE</li>
<li>Start with a 250-500 calorie deficit for sustainable weight loss (0.25-0.5kg per week)</li>
<li>Spot-reduction isn't possible - focus on overall body fat percentage</li>
<li>Aim for functional 15-20% body fat rather than extreme < 10%</li>
</ul>
</div>

Ever wonder why some people seem to lose weight effortlessly while others struggle despite following the same diet? The answer often lies in understanding your Total Daily Energy Expenditure (TDEE).

Total Daily Energy Expenditure (TDEE) refers to the amount of energy that your body expends in a day. Eat more than your TDEE, and you will store the excess energy or "gain fat". The same goes for vice versa: if you eat less than your TDEE, your body will draw energy from your body and you will "lose fat".

## The Problem with Common Calorie Counters

Your TDEE is made up of many [factors](https://www.ithrivein.com/blog/tdee-everything-you-need-to-know), and many common calorie counters such as My Fitness Pal (MFP), Lose It, Noom, etc. utilise simple questionnaires and predictive [equations](https://reference.medscape.com/calculator/846/mifflin-st-jeor-equation) which lead to largely undercut figures. This leaves many people starving and losing weight way too quickly - which will ultimately either cause them to be stuck in a weight plateau as their body metabolically adapts or frustratingly gaining it all back due to insatiable hunger.

At re:weight, we are changing this.

## How Can I Actually Calculate My TDEE?

The best way to find your TDEE is to track these 3 things:

- Your daily and weekly caloric intake
- Your weekly weight average
- [OPTIONAL] Your activity level (daily number of steps)

Over a week, track your normal calorie intake and watch your weight fluctuations. From there, if your weight has stayed relatively consistent, take your weekly caloric intake and divide it by 7 to get your TDEE.

**Example:** If you consumed 14,000 calories over 7 days and maintained your weight, your TDEE would be 2,000 calories per day.

Remember:

<div style="text-align: center; font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0; font-family: monospace;">
TDEE(kcals) = Total Weekly Caloric Intake / 7 days
</div>

From there, you can either:

- Maintain your TDEE
- Drop your calories (to lose weight)
- Increase your calories (to gain weight)

Don't worry too much about daily fluctuations in your weight which can vary widely due to water retention differences which can cause up to a [1-2kg daily change](https://health.clevelandclinic.org/weight-fluctuations)!

## Weight Loss Recommendations

For weight loss, we suggest starting with a 250 calorie deficit per day. This should have you losing around 0.25kg a week. At max, studies recommend losing 0.5kg a week, or a 500 calorie deficit per day to keep weight loss sustainable.

## How Can I Lose All of the Fat Around My Stomach?

You can't. You can't pick and choose, or "spot-reduce" fat. The only way to reduce those seemingly stubborn regions of lower belly fat is to reduce your total body weight % and it will come off as a byproduct. Women tend to store fat in the hips, thighs and lower abdomen while men tend to store fat primarily in the [abdomen](https://www.erchonia.com/blog/how-men-and-women-store-fat-differently/).

## Setting Realistic Body Fat Goals

When deciding on your weight loss goals, it is also important to set realistic body fat % goals. 

You may want to get to < 10% body fat, but consider the [effects](https://breakbingeeating.com/dangers-of-dieting/#Medical_Physiological_Dangers) that come with it:

- Difficulty sleeping
- Decreased sex drive
- Dullness of life
- Loss of period (for women)
- And many more...

Do you think that is sustainable? Look at some of the top athletes in the world. Instead of celebrating the chiseled body - we should instead be celebrating the functional 15-20% which allows you to enjoy your life and feel strong and confident in yourself.

---

As always, seek a professional for professional advice if you're feeling stuck. Feel free to contact us if you don't know where to start.
`,
    },
    {
      id: 2,
      title: "A beginner's guide to: The gym",
      excerpt: "Everything you need to know to get started with resistance training, from choosing the right workout split to understanding progressive overload and rest periods.",
      date: "Jan 05, 2025",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "beginner-gym-workouts",
      content: `<div style="background-color: rgba(0, 0, 0, 0.05); border-left: 4px solid #000; padding: 1rem 1.25rem 0.5rem 1.25rem; margin: 0 0 1.5rem 0; border-radius: 4px;">
<strong style="font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">Key Takeaways:</strong>
<ul style="margin: 0; padding-left: 1.5rem; list-style-type: disc;">
<li>Choose a workout split that fits your schedule: 1-2 days (full body), 3-4 days (upper/lower), 4+ days (PPL/bro split)</li>
<li>Aim for 10-20 sets per muscle group per week, 3-4 sets of 8-12 reps per exercise</li>
<li>Progressive overload is key: increase total load (weight × sets × reps) weekly</li>
<li>Rest 2-3 minutes between sets for optimal strength and hypertrophy</li>
<li>Track your workouts consistently using apps or a notebook</li>
<li>You can't out-train a bad diet - combine gym work with proper nutrition</li>
</ul>
</div>

Resistance training is one of the most effective ways to build muscle, boost metabolism, and improve overall health. But if you're new to the gym, where do you even start?

Going to the gym is a form of resistance training. In other words, applying tension to your muscles causes micro-tears in the fibers, helping them grow bigger and stronger - hence the term building muscle!

## What Workout Should I Follow?

The best workout for you will be the one that fits into your schedule. [Studies](https://weightology.net/the-members-area/evidence-based-guides/set-volume-for-muscle-size-the-ultimate-evidence-based-bible/) have shown that the most optimal amount of time is 10-20 sets per muscle group each week. Based on that, here are some general guidelines to follow based on how often you can go to the gym:

- **1 - 2 days a week:** Full body workouts
- **3 - 4 days a week:** 2 x Upper / Lower days
- **4+:** Push Pull Legs, a Bro Split, etc.

In terms of what to do in the workout, there are many resources you can find online (e.g., [here](https://www.hevyapp.com/pplul-split/)). Aim to spend a maximum of 1 hour in the gym. For each exercise, aim for 3-4 sets and 8-12 reps.

## Progressive Overload

It's simple - the more stimulus your muscle gets, the more strength and muscle growth you'll achieve. Total load is calculated by multiplying the weight with the number of sets and reps. Every week, you should be aiming to increase this number!

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

Always remember: you can't out train a bad diet - if your goal is weight loss, make sure you are in a caloric deficit that matches your goals.

---

As always, seek a professional for professional advice if you're feeling stuck. Feel free to contact us if you don't know where to start.
`,
    },
    {
      id: 3,
      title: "A beginner's guide to: Calorie density and food choices",
      excerpt: "Learn how to feel full and satisfied while maintaining a calorie deficit by making smart food substitutions based on calorie density.",
      date: "Feb 10, 2025",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "calorie-density-food-choices",
      content: `<div style="background-color: rgba(0, 0, 0, 0.05); border-left: 4px solid #000; padding: 1rem 1.25rem 0.5rem 1.25rem; margin: 0 0 1.5rem 0; border-radius: 4px;">
<strong style="font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">Key Takeaways:</strong>
<ul style="margin: 0; padding-left: 1.5rem; list-style-type: disc;">
<li>Calorie density matters - choose foods that fill you up with fewer calories</li>
<li>Prioritize protein (1g per lb body weight) for satiety and thermic effect</li>
<li>Swap high-calorie foods for lower-calorie alternatives (e.g., rice → cauliflower rice)</li>
<li>Load up on high-volume, low-calorie fruits and vegetables</li>
<li>Watch out for hidden calories in sauces and dressings (can add 150+ calories)</li>
<li>Artificial sweeteners are safe and effective for curbing cravings</li>
</ul>
</div>

While one part of the weight loss equation is being in a caloric deficit, this doesn't mean that you have to starve yourself! It's not just how much to eat, but what are you actually eating?

Ask yourself this:

![Calorie density comparison](/calorie-substitution.jpg)

**What would make you feel more physically full? A handful of nuts, or 2 bowls of strawberries?**

Making these informed switches will make your weight loss journey significantly easier and won't leave you feeling starved!

For a 500 calorie daily deficit - it's as easy as making the following substitutions:

> Swap rice for cauliflower rice, swap soda for diet soda, remove the dressing from your salad and replace the protein with a lean source of protein!

## Here are some of my personal favourite sources of macronutrients

*(Note: the values provided are estimates only)*

### Proteins (1g of protein = 4 calories)

**Less calorically dense:**

- Cottage Cheese: 0.9 calories / gram
- Greek Yogurt: 0.59 calories / gram
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
- PB2 (Powdered Peanut Butter): 3.8 calories / gram

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

**High volume, low calories** - perfect for feeling satisfied. Some of my favorites:
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

As always, seek a professional for professional advice if you're feeling stuck. Feel free to contact us if you don't know where to start.
`,
    },
    {
      id: 4,
      title: "I'm so scared of gaining my weight back",
      excerpt: "The fear of regaining weight after dieting is real. Here's how to transition from strict tracking to sustainable living without losing control.",
      date: "Mar 03, 2025",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "scared-of-gaining-weight-back",
      content: `<div style="background-color: rgba(0, 0, 0, 0.05); border-left: 4px solid #000; padding: 1rem 1.25rem 0.5rem 1.25rem; margin: 0 0 1.5rem 0; border-radius: 4px;">
<strong style="font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">Key Takeaways:</strong>
<ul style="margin: 0; padding-left: 1.5rem; list-style-type: disc;">
<li>Fear of regaining weight is normal - you're not alone in feeling this way</li>
<li>Slowly scale off tracking rather than stopping completely</li>
<li>Track one meal instead of all meals, use weekly weight average as your guide</li>
<li>Relearn to listen to your body's hunger and fullness signals</li>
<li>Remove "off-limits" foods from your mindset - no food is forbidden</li>
<li>If recovering from a crash diet, increase calories by 200 per week slowly</li>
<li>Have faith in yourself - you've lost weight before, you can do it again</li>
</ul>
</div>

It's normal. You've worked so hard, but you're scared to stop tracking or increase calories. What if you overeat and all that hard work goes to waste? I get it. I've been there too.

The hardest thing to let go of is that feeling of control - control over your food, your exercise, and most importantly, your weight.

## The Transition Strategy

Rather than completely scaling back, **slowly scale off** to your ideal life as you feel comfortable. Too many people revert to the same habits they had before the diet, which causes their body to return to its previous state.

Instead of tracking all meals, maybe track **one meal** instead. Use your **weekly weight average** as the true definition, and regain awareness of how your body feels before and after meals. You must relearn to rely on and listen to your body's signals. If you feel uncomfortable, scale back or add in an extra step.

## Finding Balance

It's about a healthy balance of:
- Slowly enjoying the foods you were restricting
- Sticking to habits you picked up while dieting (walks, workouts, etc.)

## Mindset Shift

You need to slowly reintroduce the concept to your mind that **no food is "off-limits"**. When you view food less as a reward, you'll yearn for it less. Instead, focus on how it makes you feel and your energy levels.

## Special Consideration: Crash Diet Recovery

If you were in an unsustainable crash diet, your body has likely metabolically adapted to new lows and will be sensitive to calorie changes. If this is you, be careful. Aim to increase your calories by **200 calories slowly per week**.

## Put That Extra Energy to Good Use

As you increase your calories and feel more energized, use that extra energy to:
- Enjoy that walk in nature
- Work extra hard at the gym
- Go out with friends and laugh a bit harder

## The 2 Mindsets That Helped Me

These two mindset shifts were game-changers in my journey from strict tracking to intuitive eating:

### 1. Have Faith in Yourself

Trust that you can put the work in and regulate to a healthy weight. You've lost weight once - so what if you eat dessert at night? Trust your body. It doesn't directly turn into fat, and if you listen to your body, it may even give you signals to intuitively eat less the next day.

Even if you gain weight, can you put in the work using what you've learned to help you get there? Do you want to live the rest of your life being worried to go on holiday and gain weight?

### 2. Remove Viewing Food as a Reward

As soon as I opened up the ability to allow myself to eat whatever I want, my yearning for the reward decreased. I realised I didn't need to eat the whole cake - it would make me feel terrible, and I could just eat it the next day.

---

As always, seek a professional for professional advice if you're feeling stuck. Feel free to contact us if you don't know where to start.
`,
    },
    {
      id: 5,
      title: "I can't stop thinking about food",
      excerpt: "Constant food thoughts can be exhausting. Learn how to understand what your body is really telling you and shift your relationship with food from restriction to freedom.",
      date: "Apr 03, 2025",
      views: 0,
      likes: 0,
      comments: 0,
      slug: "cant-stop-thinking-about-food",
      content: `<div style="background-color: rgba(0, 0, 0, 0.05); border-left: 4px solid #000; padding: 1rem 1.25rem 0.5rem 1.25rem; margin: 0 0 1.5rem 0; border-radius: 4px;">
<strong style="font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">Key Takeaways:</strong>
<ul style="margin: 0; padding-left: 1.5rem; list-style-type: disc;">
<li>Constant food thoughts may be your body signaling it's hungry or needs more calories</li>
<li>How do you view food - is it a reward or fuel?</li>
<li>Years of restriction create mental cravings even when physically satisfied</li>
<li>Give yourself permission to eat anything, but you don't have to eat everything</li>
<li>Learn to trust that you can eat it and be okay</li>
<li>Pay attention to how foods make you feel after eating them</li>
<li>Balance immediate enjoyment with how you'll feel afterward</li>
</ul>
</div>

The first and most important check is to ask yourself: **are you really fueling your body correctly to feel energized and strong?**

Sometimes, constant food thoughts are simply your body's way of telling you it's hungry. If you've been in a calorie deficit or restricting certain foods, your body will signal its needs - and those signals can manifest as obsessive thoughts about food.

**Really ask yourself: are you eating enough throughout the day to feel strong and energized?**

If you're genuinely hungry or under-fueled, increasing your calories and ensuring you're eating balanced meals can significantly reduce food preoccupation.

## How do you view food?

Next, view your relationship with food: **is it more of a reward and enjoyment, or a way to fuel your body?**

Everyone will be different, and there's no "right" answer. However, if you have restricted for years, of course mentally you are going to see it as some sort of reward and yearn for it.

For me, the best outcome came from realizing that **I can eat it whenever I want and be okay, but that doesn't mean I have to eat the whole thing**.

## Pay Attention to How Food Makes You Feel

After a while, I started to become aware of how food made me feel after eating it. And from there, I found that I didn't yearn for it as much because I was able to weigh up the immediate enjoyment with the aftermath of how it was making me feel and make better informed decisions.

**Try this:**
- After eating, check in with yourself: How do I feel physically?
- Do I feel energized or sluggish?
- Am I satisfied or still craving more?
- How will I feel in an hour? Tomorrow?

This awareness helps you make choices that honor both your enjoyment and your well-being.

## Make Informed Choices

You've got this. The journey from constant food thoughts to food freedom isn't straightforward, but it's definitely possible.

---

As always, seek a professional for professional advice if you're feeling stuck. Feel free to contact us if you don't know where to start.
`,
    },
  ]
  
  export function getBlogBySlug(slug: string): Blog | undefined {
    return mockBlogs.find((blog) => blog.slug === slug)
  }
  
  export function getAllBlogSlugs(): string[] {
    return mockBlogs.map((blog) => blog.slug)
  }
  