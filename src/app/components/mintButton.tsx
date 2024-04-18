'use client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import useUmi from './wallet/useUmi';
import { mintWithSol, mintWithToken } from '../models/candyMachine';

export default function MintButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallet, umi } = useUmi();
  const toast = useToast();

  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [isMinting, setIsMinting] = useState(false);

  const handleMinting = async () => {
    setIsMinting(true);
    onClose();
    let promise: Promise<string>;
    try {
      if (paymentMethod === 'TOKEN') {
        promise = mintWithToken(umi);
      } else {
        promise = mintWithSol(umi);
      }
      toast.promise(promise, {
        loading: {
          position: 'top',
          title: 'Minting your NFT',
          description: 'Please confirm the transactino and then wait for your NFT to get created',
        },
        success: (sig) => ({
          position: 'top',
          title: 'Minted successfully',
          description: `Transaction signature: ${sig}`,
        }),
        error: (err) => ({
          position: 'top',
          title: 'Something went wrong while minting',
          description: err.message,
        }),
      });
      await promise;
    } catch (err: any) {
      console.error(err);
    }
    setIsMinting(false);
  };

  return (
    <>
      <Button
        isDisabled={!wallet.connected}
        isLoading={isMinting}
        onClick={onOpen}
        colorScheme="gold"
        className="mt-8 appearance-none rounded-md border border-neutral-500 bg-gold-500 px-7 py-2 font-medium leading-tight text-neutral-300 hover:bg-gold-800 active:bg-gold-800"
      >
        <Tooltip isDisabled={wallet.connected} label="Please connect your wallet" aria-label="A tooltip">
          Start Minting
        </Tooltip>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h2" fontSize="large">
            Minting an NFT
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as="p" fontSize="lg" fontWeight={400}>
              Choose the payment method:
            </Text>
            <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
              <Stack direction="row">
                <Radio value="SOL" fontWeight={400}>
                  SOL
                </Radio>
                <Radio value="TOKEN" fontWeight={400}>
                  Token
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button isLoading={isMinting} isDisabled={!paymentMethod} colorScheme="blue" mr={3} onClick={handleMinting}>
              <Tooltip isDisabled={!!paymentMethod} label="Please choose your payment method" aria-label="A tooltip">
                Mint
              </Tooltip>
            </Button>
            <Button isLoading={isMinting} variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
