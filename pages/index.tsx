import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import TabCard from "../components/TabCard";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.headingSection}>
        <Image
          width={1500}
          height={1500}
          src="https://imgur.com/d47svBB.png"
          alt="seaction_logo"
        />
      </Box>
      <Box>
        <Box className={styles.headLine}>
          <Text className={styles.headingTxt}>
            Discover the vast universe of <span>Hippie Aliens Cosmic Club</span>
          </Text>
          <p className={styles.para}>
            H.A.C.K is the gateway to Zuraverse. H.A.C.K NFTs introduce
            Zuraverse to the Web3 audience.
            <br />
            <span>
              {" "}
              They are the stepping stone in the formation of Zuraverse.
            </span>
          </p>
          <Flex mt={7} gap={7}>
            <Button bg={"blue"}>Connect Wallet</Button>
            <Button>Read More</Button>
          </Flex>
        </Box>
      </Box>

      <Box className={styles.tabs}>
        <Tabs>
          <TabList>
            <Tab>Zuraverse</Tab>
            <Tab>Conzura</Tab>
          </TabList>

          <TabPanels>
            <TabPanel className={styles.grid}>
              <TabCard />
            </TabPanel>
            <TabPanel className={styles.grid}>
              <p>Coming Soon😊!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Home;
