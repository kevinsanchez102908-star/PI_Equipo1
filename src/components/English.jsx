import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const English = () => {

  const campaignCards = [
    { 
      title: "Purpose",
      text: "The purpose of this campaign is to create awareness about the pollution in the Lerma River and to promote actions to clean and protect it. We want to reduce pollution, recycle waste, and teach our community the importance of taking care of water. This campaign is important because clean water means life for everyone.",
      img: "/images/image3.png"
    },
    { 
      title: "Colours",
      text: "We use blue and green in our campaign. Blue represents clean water and peace, while green symbolizes nature, life, and hope for a better environment.",
      img: "/images/image5.png"
    },
    { 
      title: "Facts",
      text: "It is estimated that more than 3,000 industries are located near the Lerma River, and tons of waste are dumped into it every year. Many fish and plants have been affected by the pollution, and the water is no longer safe for people.",
      img: "/images/image11.png"
    },
    { 
      title: "Public",
      text: "Our campaign is for students, local families, and people who live near the river. We also invite schools and local authorities to join our activities.",
      img: "/images/image4.png"
    },
    { 
      title: "Activities",
      text: "We will organize cleaning events along the river, recycling workshops in schools, and social media campaigns to share information. We will also plant trees near the river to help filter the air and water. Together, we can make a real change.",
      img: "/images/image10.png"
    },
    { 
      title: "Gallery",
      text: "Explore some of the visual materials of our environmental campaign and the work done during our activities.",
      img: null
    }
  ];

  return (
    <section id="english" className="py-20 px-5 lg:px-20 bg-black text-white relative overflow-hidden">

      {/* Luz diagonal de fondo blanca */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "0%",
          right: "-40%",
          width: "160vh",
          height: "30vh",
          background: "linear-gradient(115deg, rgba(255,255,255,0.8), rgba(255,255,255,0.25), transparent 75%)",
          filter: "blur(75px)",
          transform: "rotate(-30deg)",
          opacity: 1,
        }}
      ></div>

      {/* Título con degradado púrpura → rosa */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-500 to-pink-500">
          Our Campaign to Save the Lerma River
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto">
          Discover our efforts to reduce pollution, protect wildlife, and educate the community about clean water.
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaignCards.map((card, index) => (
          <Card
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white border border-gray-200 text-black"
          >
            {/* Gradiente decorativo interno */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent opacity-20 rounded-full blur-3xl pointer-events-none"></div>

            <CardHeader className="relative z-10 flex flex-col gap-4 p-6">
              {/* Imagen más grande */}
              {card.img && (
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <CardTitle className="text-2xl font-semibold">{card.title}</CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 p-6 text-black">
              {card.text}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default English;
