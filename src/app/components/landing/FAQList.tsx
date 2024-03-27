"use client";

import FAQItem from "./FAQItem";

const faqsList = [
  {
    q: "What is the Super Phoenix DAO?",
    ans: "The Super Phoenix DAO will be a licensed and legally registered entity created for the purpose of owning and operating the Superphoenix Titan Starship within the Star Atlas metaverse.",
  },
  {
    q: "What is the Data Cube NFT?",
    ans: "The data cube NFT is an exclusive membership asset that entitles the holder to lifetime access to the amenities of the Superphoenix Titan Ship. The NFT offering will have 3 rarity tiers which offer increasing levels of rewards and future access within the Superphoenix Titan Ship.",
  },
  {
    q: "Who will manage and operate the Superphoenix Titan ship?",
    ans: "The Superphoenix Titan ship will be deployed to SAGE/ Starbased using the player profile system to securely manage operations in partnership with affiliated guilds until DAO governance is established.",
  },
  {
    q: "What will DAO revenue funds be used for?",
    ans: "Funds will accrue to the DAO treasury from the initial DAO token sale with a portion earmarked to establish a DEX market listing. Once community governance is established, all DAO funds and assets will be available to the community to use as it sees fit",
  },
  {
    q: "When will the EMBER token be available?",
    ans: "The DAO token launch of EMBER will be announced in advance and published on the DAO website. The token sale is planned for launch in Q3 2024",
  },
  {
    q: "How do I buy EMBER tokens?",
    ans: "EMBER DAO Tokens will be available for sale on the DAO website for direct purchase at a price of $1.00 each and can be purchased with USDC (Solana) or Atlas.",
  },
  {
    q: "What is the benefit of being a Super Phoenix DAO member?",
    ans: "Ownership of Super Phoenix DAO tokens provides the ability to participate in the decision making and governance of the Superphoenix Titan Ship. The Super Phoenix DAO community will be a uniquely positioned and influential group within the Star Atlas metaverse, comprised of members from all factions and guilds.",
  },
];

export default function FAQs() {
  return (
    <div className="container">
      <h1 className="text-white text-center text-5xl mb-16">
        FREQUENTLY ASKED QUESTIONS
      </h1>

      <div className="mx-6">
        {faqsList.map((faq) => (
          <FAQItem {...faq} key={faq.q} />
        ))}
      </div>
    </div>
  );
}
