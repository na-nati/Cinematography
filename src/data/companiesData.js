// src/data/companiesData.js
import QRS from "../assets/QRS.jpg";
import Habtam from "../assets/Habtam.png";
import fourwinds from "../assets/FOUR WINDS .png";
import ewawa from"../assets/ewawa.png";
import sheqela from"../assets/sheqela.png";
import orbit from "../assets/Orbit.png";
// Placeholder imports for new logos - replace with actual paths
import Nib from "../assets/Orbit.png"; // Assuming you'll add nib.png to your assets
import AOne from "../assets/A one .jpg"; // Assuming you'll add a-one.png to your assets


export const companies = [
  {
    id: "orbit", // Set Orbit as the default ID, so it shows first
    name: "Orbit",
    logo: orbit,
    description: "Partnered to create breathtaking travel documentaries and promotional films, showcasing adventure and exploration. Journey with Orbit.",
    videos: [
      {
        url: "https://youtube.com/shorts/v3He5TboCO0", // NEW YOUTUBE SHORT VIDEO
        title: "Orbit - Dynamic Travel Shots",
        description: "Capturing the essence of adventure with stunning short clips.",
      },
      {
        url: "https://vimeo.com/1092080900/e3b4de5129?share=copy", // Replace with actual Orbit videos
        title: "Orbit - Adventure Series",
        description: "A dynamic visual narrative showcasing our recent client collaboration with Orbit, exploring intricate patterns and fluid movements to represent innovation.",
      },
      {
        url: "https://youtube.com/shorts/v3He5TboCO0", // Placeholder: Replace with actual Orbit video URL
        title: "Orbit - Cultural Journeys",
        description: "Exploring rich cultures and historical sites around the world.",
      },
    ],
  },
  {
    id: "qrs-furniture", // Unique ID for URL parameter (lowercase, hyphenated is good practice)
    name: "QRS Furniture",
    logo: QRS,
    description: "Collaborated on their captivating visual campaigns, showcasing the unique design and quality of their furniture. Explore their collection.",
    videos: [
      {
        url: "https://vimeo.com/1092081999/e97da79b8b?share=copy", // Replace with actual QRS videos
        title: "QRS - Living Room Collection",
        description: "An elegant presentation of bespoke furniture designs for QRS Furniture, highlighting craftsmanship and contemporary aesthetics in various settings.",
      },
      {
        url: "https://vimeo.com/your-qrs-video-2-url", // Placeholder: Replace with actual QRS video URL
        title: "QRS - Bedroom & Office Furniture",
        description: "A look at QRS's comfortable bedroom sets and ergonomic office solutions.",
      },
      // Add more QRS-specific videos as needed
    ],
  },
  {
    id: "habtam-bet",
    name: "Habtam Bet",
    logo: Habtam,
    description: "Produced engaging video content that highlights the artistry and deliciousness of their traditional culinary products. Dive into their heritage.",
    videos: [
      {
        url: "https://vimeo.com/1092081163/402f6632f7?share=copy", // Replace with actual Habtam videos
        title: "Habtam Bet - Chocolate Craft",
        description: "Behind the scenes of artisanal chocolate making, from bean selection to final packaging, emphasizing the passion and precision involved.",
      },
      {
        url: "https://vimeo.com/your-habtam-video-2-url", // Placeholder: Replace with actual Habtam video URL
        title: "Habtam Bet - Traditional Delicacies",
        description: "Showcasing the preparation and presentation of Habtam Bet's traditional culinary delights.",
      },
    ],
  },
  {
    id: "four-winds",
    name: "Four Winds",
    logo: fourwinds,
    description: "Created stunning architectural visualizations and promotional videos for their innovative and sustainable building projects. See their vision.",
    videos: [
      {
        url: "https://vimeo.com/1092080665/477e7b71d4?share=copy", // Replace with actual Four Winds videos
        title: "Four Winds - Nature's Resilience",
        description: "Capturing the enduring beauty of landscapes and the perseverance of life for Four Winds, featuring breathtaking views and compelling natural phenomena.",
      },
      {
        url: "https://vimeo.com/your-fourwinds-video-2-url", // Placeholder: Replace with actual Four Winds video URL
        title: "Four Winds - Sustainable Architecture",
        description: "Highlighting innovative and eco-friendly building designs by Four Winds.",
      },
    ],
  },
  {
    id: "ewawa-hair",
    name: "Ewawa Hair",
    logo: ewawa,
    description: "Developed vibrant and stylish video advertisements that perfectly capture the essence of their modern hair care brand. Discover their beauty.",
    videos: [
      {
        url: "https://youtube.com/shorts/N_xLMs9dfjg", // Placeholder: Replace with actual Ewawa video URL
        title: "Ewawa Hair - Style Transformations",
        description: "Vibrant and stylish video showcasing stunning hair transformations for Ewawa Hair.",
      },
      {
        url: "https://youtube.com/shorts/z4pFqxCg66s", // Placeholder: Replace with actual Ewawa video URL
        title: "Ewawa Hair - Product Showcase",
        description: "Highlighting the quality and benefits of Ewawa Hair care products.",
      },
      {
        url: "https://youtube.com/shorts/9-4UL38Z_p4", // Placeholder: Replace with actual Ewawa video URL
        title: "Ewawa Hair - Product Showcase",
        description: "Highlighting the quality and benefits of Ewawa Hair care products.",
      },
      {
        url: "https://youtube.com/shorts/pdFctTmguTE", // Placeholder: Replace with actual Ewawa video URL
        title: "Ewawa Hair - Product Showcase",
        description: "Highlighting the quality and benefits of Ewawa Hair care products.",
      },
      {
        url: "https://youtube.com/shorts/eSFLLdVVtQs", // Placeholder: Replace with actual Ewawa video URL
        title: "Ewawa Hair - Product Showcase",
        description: "Highlighting the quality and benefits of Ewawa Hair care products.",
      },
    ],
  },
  {
    id: "sheqela",
    name: "Sheqela",
    logo: sheqela,
    description: "Shot and directed their latest fashion lookbook, bringing their unique apparel designs to life with dynamic visuals. Explore their collection.",
    videos: [
      {
        url: "https://vimeo.com/your-sheqela-video-1-url", // Placeholder: Replace with actual Sheqela video URL
        title: "Sheqela - Latest Collection",
        description: "Dynamic visuals for their vibrant summer apparel.",
      },
      {
        url: "https://vimeo.com/your-sheqela-video-2-url", // Placeholder: Replace with actual Sheqela video URL
        title: "Sheqela - Street Style",
        description: "Capturing urban fashion trends with Sheqela designs.",
      },
    ],
  },
  {
    id: "nib",
    name: "Nib chocolate",
    logo: Nib, // Assuming you have nib.png in your assets folder
    description: "Developed engaging promotional content for Nib chocolate, highlighting their services and customer-centric approach.",
    videos: [
      {
        url: "https://vimeo.com/your-nib-video-1-url", // Placeholder: Replace with actual Nib video URL
        title: "Nib chocolate",
        description: "Showcasing Nib chocolate seamless experience.",
      },
      {
        url: "https://vimeo.com/your-nib-video-2-url", // Placeholder: Replace with actual Nib video URL
        title: "Nib chocolate",
        description: "Highlighting Nib chocolate commitment to customer satisfaction.",
      },
    ],
  },
  {
    id: "a-one",
    name: "A One skincare",
    logo: AOne, // Assuming you have a-one.png in your assets folder
    description: "Created stylish and modern video lookbooks for A One skincare.",
    videos: [
      {
        url: "https://youtube.com/shorts/doq358IAW7c", // Placeholder: Replace with actual A One video URL
        title: "A One skincare ",
        description: "Vibrant visuals for A One skincare.",
      },
      {
        url: "https://youtube.com/shorts/kBeeGSM57dw", // Placeholder: Replace with actual A One video URL
        title: "A One skincare",
        description: "A narrative piece on the inspiration behind A One skincare.",
      },
      {
        url: "https://youtube.com/shorts/Ha3I6F94yDg", // Placeholder: Replace with actual A One video URL
        title: "A One skincare",
        description: "A narrative piece on the inspiration behind A One skincare.",
      },
    ],
  },
];
