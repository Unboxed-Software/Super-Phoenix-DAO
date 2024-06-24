import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const TIER_INFO = {
  T1: {
    src: 'https://shdw-drive.genesysgo.net/BamXrN29Jkq9HA3UyLZWEaikDa3zcVgnP6nakvrZdQ72/t1_converted.mp4',
    rarity: 'Common',
  },
  T2: {
    src: 'https://shdw-drive.genesysgo.net/BamXrN29Jkq9HA3UyLZWEaikDa3zcVgnP6nakvrZdQ72/t2_converted.mp4',
    rarity: 'Uncommon',
  },
  T3: {
    src: 'https://shdw-drive.genesysgo.net/BamXrN29Jkq9HA3UyLZWEaikDa3zcVgnP6nakvrZdQ72/t3_converted.mp4',
    rarity: 'Rare',
  },
  T4: {
    src: 'https://shdw-drive.genesysgo.net/BamXrN29Jkq9HA3UyLZWEaikDa3zcVgnP6nakvrZdQ72/t4_converted.mp4',
    rarity: 'Epic',
  },
  T5: {
    src: 'https://shdw-drive.genesysgo.net/BamXrN29Jkq9HA3UyLZWEaikDa3zcVgnP6nakvrZdQ72/t5_converted.mp4',
    rarity: 'Legendary',
  },
  T6: {
    src: 'https://shdw-drive.genesysgo.net/BamXrN29Jkq9HA3UyLZWEaikDa3zcVgnP6nakvrZdQ72/t6_converted.mp4',
    rarity: 'Mythic',
  },
} as const;

type Props = {
  open: boolean;
  tier: keyof typeof TIER_INFO;
  onClose: () => void;
};

export default function RevealModal({ open, tier, onClose }: Props) {
  const tierObj = TIER_INFO[tier];
  const tweetLink = `https://twitter.com/intent/post?text=I%20just%20minted%20a%20${tierObj.rarity}%20Super%20Phoenix%20Core%20Data%20Cube!%0A%0A%40SuperPhoenixDAO%0A%0A${tierObj.src}&url=https%3A%2F%2Fsuperphoenixdao.com%2Fmint`;
  return (
    <Dialog modal open={open}>
      <DialogContent className="border-gray-500 bg-gray-850" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="flex justify-center align-middle text-5xl text-white">CUBE SECURED</DialogTitle>
          <div>
            <video
              preload="auto"
              autoPlay
              playsInline
              src={tierObj.src}
              poster="https://res.cloudinary.com/diirb5dmv/image/upload/v1719060889/poster.jpg"
            />
          </div>
        </DialogHeader>
        <div className="flex justify-center align-middle">
          <a href={tweetLink} target="_blank" className="text-2xl text-white underline">
            Annouce your enrolment
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
