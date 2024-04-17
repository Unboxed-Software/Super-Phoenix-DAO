'use client';
import React, { FC, ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../models/theme';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;
