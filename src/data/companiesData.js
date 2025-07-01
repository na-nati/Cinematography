// src/data/companiesData.js
import QRS from "../assets/QRS.jpg";
import Habtam from "../assets/Habtam.png";
import fourwinds from "../assets/FOUR WINDS .png";
import ewawa from"../assets/ewawa.png";
import sheqela from"../assets/sheqela.png";
import orbit from "../assets/Orbit.png";
// Placeholder imports for new logos - replace with actual paths
import Nib from "../assets/nib.png"; // Assuming you'll add nib.png to your assets
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
        url: "https://youtube.com/shorts/BRT_DkyW3VU", // Replace with actual Orbit videos
        title: "Orbit - Adventure Series",
        description: "A dynamic visual narrative showcasing our recent client collaboration with Orbit, exploring intricate patterns and fluid movements to represent innovation.",
      },
      {
        url: "https://vimeo.com/1092080900/e3b4de5129?share=copy", // Replace with actual Orbit videos
        title: "Orbit - Adventure Series",
        description: "A dynamic visual narrative showcasing our recent client collaboration with Orbit, exploring intricate patterns and fluid movements to represent innovation.",
      },
      {
        url: "https://youtube.com/shorts/IlgdAsiSxKk", // Placeholder: Replace with actual Orbit video URL
        title: "Orbit - Cultural Journeys",
        description: "Exploring rich cultures and historical sites around the world.",
      },
      {
        url: "https://youtube.com/shorts/pjCxC3R1gdc", // Placeholder: Replace with actual Orbit video URL
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
    videos:[
      {
        url: "https://youtube.com/shorts/S0L_A5uJzFs",
        title: "QRS - Living Room Collection",
        description: "Showcasing QRS living room furniture; highlights craftsmanship and contemporary design."
      },
      {
        url: "https://youtube.com/shorts/oWuwQt1DTxQ",
        title: "QRS - Bedroom & Office Furniture",
        description: "Visual presentation of QRS bedroom and office lines; emphasizes comfort and ergonomic style."
      },
      {
        url: "https://youtube.com/shorts/GsjzwW-CX7M",
        title: "QRS - Living Room & Office Furniture",
        description: "Capturing refined details and superior quality of QRS furniture for inviting spaces."
      },
      {
        url: "https://youtube.com/shorts/pWo9U-Ho5t8",
        title: "QRS - Bedroom Collection",
        description: "Immersive visual experience of QRS bedroom collection; conveying luxury and innovative design."
      }
    ],
  },
  {
    id: "habtam-bet",
    name: "Habtam Bet",
    logo: Habtam,
    description: "Produced engaging video content that highlights the artistry and deliciousness of their traditional culinary products. Dive into their heritage.",
    videos: [
      {
        url: "https://youtube.com/shorts/X2yWuq5apI0", // Replace with actual Habtam videos
        title: "Habtam Bet ",
        description: "A visually compelling segment from an independent short film, highlighting atmospheric lighting, dynamic camera work, and a moody color palette to evoke urban solitude and reflection.",
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
        url: "https://youtube.com/shorts/KrepHTIX_c0", // Replace with actual Four Winds videos
        title: "Four Winds - Nature's Resilience",
        description: "Capturing the enduring beauty of landscapes and the perseverance of life for Four Winds, featuring breathtaking views and compelling natural phenomena.",
      },
      {
        url: "https://youtube.com/shorts/Y0eYtkDZq-Q", // Placeholder: Replace with actual Four Winds video URL
        title: "Four Winds - Sustainable Architecture",
        description: "Highlighting innovative and eco-friendly building designs by Four Winds.",
      },
      {
        url: "https://youtube.com/shorts/npYz3H4Wxd0", // Replace with actual Four Winds videos
        title: "Four Winds - Nature's Resilience",
        description: "Capturing the enduring beauty of landscapes and the perseverance of life for Four Winds, featuring breathtaking views and compelling natural phenomena.",
      },
      {
        url: "https://youtube.com/shorts/16uMLLvCZyA", // Replace with actual Four Winds videos
        title: "Four Winds - Nature's Resilience",
        description: "Capturing the enduring beauty of landscapes and the perseverance of life for Four Winds, featuring breathtaking views and compelling natural phenomena.",
      },
      {
        url: "https://youtube.com/shorts/_Ym7LWNNgIQ", // Replace with actual Four Winds videos
        title: "Four Winds - Nature's Resilience",
        description: "Capturing the enduring beauty of landscapes and the perseverance of life for Four Winds, featuring breathtaking views and compelling natural phenomena.",
      },
      {
        url: "https://youtube.com/shorts/3Si_ZQXk1UE", // Replace with actual Four Winds videos
        title: "Four Winds - Nature's Resilience",
        description: "Capturing the enduring beauty of landscapes and the perseverance of life for Four Winds, featuring breathtaking views and compelling natural phenomena.",
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
        url: "https://youtube.com/shorts/qSvmrjAqOZQ", 
        title: "Ewawa Hair - Style Transformations",
        description: "Dynamic visuals of hair transformations and diverse styling.",
      },
      {
        url: "https://youtube.com/shorts/wjfdktlPd6U", 
        title: "Ewawa Hair - Product Showcase",
        description: "Engaging product showcase; highlights hair quality and texture.",
      },
      {
        url: "https://youtube.com/shorts/esvcbplIevE", 
        title: "Ewawa Hair - Product Showcase",
        description: "Premium product visuals; emphasizes quality and versatility.",
      },
      {
        url: "https://youtube.com/shorts/lf7KMhetmoo", 
        title: "Ewawa Hair - Product Showcase",
        description: "Cinematic focus on product features and luxurious appeal.",
      },
      {
        url: "https://youtube.com/shorts/FIffFWvnITk",
        title: "Ewawa Hair - Product Showcase",
        description: "Aesthetic product display; highlights quality and potential.",
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
        url: "https://youtube.com/shorts/O15jczVjYtA", // Placeholder: Replace with actual Sheqela video URL
        title: "Sheqela - Latest Collection",
        description: "Dynamic visuals for their vibrant summer apparel.",
      },
      {
        url: "https://youtube.com/shorts/9Ug8uKn-WXw", // Placeholder: Replace with actual Sheqela video URL
        title: "Sheqela - Street Style",
        description: "Capturing urban fashion trends with Sheqela designs.",
      },
    ],
  },
  {
    id: "nib",
    name: "Nib chocolate",
    logo: Nib, 
    description: "Developed engaging promotional content for Nib chocolate, highlighting their services and customer-centric approach.",
    videos: [
      {
        url: "https://youtube.com/shorts/XS-tK8uVlUk", // Placeholder: Replace with actual Nib video URL
        title: "Nib chocolate",
        description: "Showcasing Nib chocolate seamless experience.",
      },
      {
        url: "https://youtube.com/shorts/RIE0jSRx5vs", // Placeholder: Replace with actual Nib video URL
        title: "Nib chocolate",
        description: "Highlighting Nib chocolate commitment to customer satisfaction.",
      },
      {
        url: "https://youtube.com/shorts/zkmtqs0SrBc", // Placeholder: Replace with actual Nib video URL
        title: "Nib chocolate",
        description: "Highlighting Nib chocolate commitment to customer satisfaction.",
      },
      {
        url: "https://youtube.com/shorts/T4SSVUjC5f4", // Placeholder: Replace with actual Nib video URL
        title: "Nib chocolate",
        description: "Showcasing Nib chocolate seamless experience.",
      },
      {
        url: "https://youtube.com/shorts/_qIEoo1H_Uc", // Placeholder: Replace with actual Nib video URL
        title: "Nib chocolate",
        description: "Showcasing Nib chocolate seamless experience.",
      },
      {
        url: "https://youtube.com/shorts/4WbxCAgO2oM", // Placeholder: Replace with actual Nib video URL
        title: "Nib chocolate",
        description: "Showcasing Nib chocolate seamless experience.",
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
        url: "https://youtube.com/shorts/mk9D1sPyCo8", // Placeholder: Replace with actual A One video URL
        title: "A One skincare ",
        description: "Vibrant visuals for A One skincare.",
      },
      {
        url: "https://youtube.com/shorts/0Olm-u71toc", // Placeholder: Replace with actual A One video URL
        title: "A One skincare",
        description: "A narrative piece on the inspiration behind A One skincare.",
      },
      {
        url: "https://youtube.com/shorts/QPIU9IQWaEg", // Placeholder: Replace with actual A One video URL
        title: "A One skincare",
        description: "A narrative piece on the inspiration behind A One skincare.",
      },
    ],
  },
];
