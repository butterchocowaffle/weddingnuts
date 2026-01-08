# Programmable Components Guide

This project is designed to be easily configurable via the `app/src/data/landing-content.json` file. This allows you to update content, images, videos, and text without modifying the code.

## File Location
`app/src/data/landing-content.json`

---

## Components

### 1. Hero Section
The main top section of the website.

**Property:** `hero`

| Property | Type | Description |
| :--- | :--- | :--- |
| `videos` | `Array` | List of background videos that loop and rotate. |
| `texts` | `Array` | List of text slides that animate over the videos. |

#### `hero.videos` Object
| Property | Type | Description |
| :--- | :--- | :--- |
| `data` | `String` | Direct URL to the video file (mp4). |
| `type` | `String` | *(Optional)* Set to `"url"` or leave undefined for standard video URLs. |

#### `hero.texts` Object
| Property | Type | Description |
| :--- | :--- | :--- |
| `bigText` | `String` | The main white heading text. |
| `bigTextYellow` | `String` | The highlighted yellow heading text (appears on next line). |
| `smallText` | `String` | The subtitle or description text. |
| `duration` | `Number` | Duration in seconds to show this slide before switching. |

---

### 2. Testimonials Section
Displays video stories and text reviews from clients.

**Property:** `testimonials`

| Property | Type | Description |
| :--- | :--- | :--- |
| `backgroundVideos` | `Array<String>` | List of video URLs for the section background. |
| `videoTestimonials` | `Array` | List of video cards/stories to display. |
| `textTestimonials` | `Array` | List of text-based reviews. |

#### `testimonials.videoTestimonials` Object
| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | `String` | One of: `"asset"` (local/direct image), `"url"` (direct video w/ thumb), `"youtube"`, `"instagram"`. |
| `src` | `String` | Source URL for the image, video, or embed. |
| `thumbnail` | `String` | *(For type="url"/"instagram")* URL of the cover image to display. |
| `title` | `String` | Title of the story/testimonial. |
| `location` | `String` | Location text (e.g., "Jaipur, Rajasthan"). |

#### `testimonials.textTestimonials` Object
| Property | Type | Description |
| :--- | :--- | :--- |
| `text` | `String` | The main review content. |
| `author` | `String` | Name of the reviewer. |
| `subtitle` | `String` | Additional info (e.g., "Married Dec 2025"). |

---

### 3. Services Section
Displays the "Build Your Dream Team" grid.

**Property:** `services`

| Property | Type | Description |
| :--- | :--- | :--- |
| `backgroundVideos` | `Array<String>` | List of video URLs for the section background. |

---

### 4. CTA Section
The "Ready to Plan..." section at the bottom.

**Property:** `cta`

| Property | Type | Description |
| :--- | :--- | :--- |
| `backgroundVideos` | `Array<String>` | List of video URLs for the section background. |

---

### 5. Why Us Section
The section explaining "Why WeddingNuts?".

**Property:** `whyUs`

| Property | Type | Description |
| :--- | :--- | :--- |
| `initialVideo` | `String` | URL of the video that plays once when scrolled into view. Use `"default"` for built-in video. |
| `loopVideo` | `String` | URL of the video that loops in the background after the intro finishes. |
| `showBackgroundVideo`| `Boolean` | Set `true` to enable videos, `false` to use solid background color. |
| `backgroundColor` | `String` | Hex color code (e.g., `"#ffd9d9"`) used if videos are disabled or loading. |
