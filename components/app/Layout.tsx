import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
  Image,
  Heading,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaClipboardList, FaEye } from "react-icons/fa";

import { IconType } from "react-icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Organization } from "../../types/organization.types";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { FETCH_ORGANIZATIONS } from "../../graphql/myOrganizations.graphql";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  linkTo: string;
  organizations?: Organization[] | null;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { t } = useTranslation();
  const { data } = useQuery(FETCH_ORGANIZATIONS);
  const [showOrganizations, setShowOrganizations] = useState(true);
  const [showDisputes, setShowDisputes] = useState(true);
  const [orgs, setOrgs] = useState<Organization[]>([]);

  useEffect(() => {
    if (!data) return;
    setOrgs(data.organizationOfUser);
  }, [data]);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Image src={"/images/logo.png"} maxH={20} maxW={100} alt="Logo" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <VStack align="start" mb={8}>
        <Flex align="center" justify="start" w={"100%"}>
          <NavItem icon={FaEye} linkTo={"dashboard"} ml={0}>
            <Heading
              fontSize={{ base: "md", sm: "sm", md: "md" }}
              fontWeight="bold"
              bgGradient="linear(to-l, #3107DA, #5E39F1)"
              bgClip="text"
            >
              {t("sidebar.myOrganizations")}
            </Heading>
          </NavItem>
          <IconButton
            ml={0}
            aria-label="Toggle organizations"
            icon={showOrganizations ? <FiChevronUp /> : <FiChevronDown />}
            onClick={() => setShowOrganizations(!showOrganizations)}
          />
        </Flex>
        {orgs && showOrganizations &&
          orgs.map((org) => (
            <Link href={`/dashboard?id=${org.id}`} key={org.id}>
              <Box
                ml={10}
                key={org.id}
                _hover={{
                  bg: "cyan.400",
                  color: "white",
                }}
              >
                {" "}
                {org.name}
              </Box>
            </Link>
          ))}
      </VStack>
      <VStack align="start">
        <Flex align="center" justify="start" w={"100%"}>
          <NavItem icon={FaEye} linkTo={"dashboard"} ml={0}>
            <Heading
              fontSize={{ base: "md", sm: "sm", md: "md" }}
              fontWeight="bold"
              bgGradient="linear(to-l, #3107DA, #5E39F1)"
              bgClip="text"
            >
              {t("sidebar.disputes")}
            </Heading>
          </NavItem>
          <IconButton
            ml={0}
            aria-label="Toggle disputes"
            icon={showDisputes ? <FiChevronUp /> : <FiChevronDown />}
            onClick={() => setShowDisputes(!showDisputes)}
          />
        </Flex>
        {showDisputes && (
          // orgs.map((org) => (
          //   <Link href={`/dispute?id=${org.id}`} key={org.id}>
          //     <Box
          //       ml={10}
          //       key={org.id}
          //       _hover={{
          //         bg: "cyan.400",
          //         color: "white",
          //       }}
          //     >
          //       {" "}
          //       {org.name}
          //     </Box>
          //   </Link>
          // ))
          <>
            <Link href={`/dispute?id=123`}>
              <Box
                ml={10}
                _hover={{
                  bg: "cyan.400",
                  color: "white",
                }}
              >
                {" "}
                {"dispute 1"}
              </Box>
            </Link>
            <Link href={`/dispute?id=123`}>
              <Box
                ml={10}
                _hover={{
                  bg: "cyan.400",
                  color: "white",
                }}
              >
                {" "}
                {"dispute 2"}
              </Box>
            </Link>
          </>
        )}
      </VStack>
    </Box>
  );
};

const NavItem = ({ icon, children, linkTo, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={`/${linkTo}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { i18n } = useTranslation();
  const [imageSrc, setImageSrc] = useState("/images/eng_flag.png");

  useEffect(() => {
    setImageSrc(
      i18n.language === "en" ? "/images/eng_flag.png" : "/images/esp_flag.png"
    );
  }, [i18n.language]);

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton as={Button}>
              <Image
                src={imageSrc}
                boxSize="30px" // Ajusta el tamaño según prefieras
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
              <MenuItem onClick={() => changeLanguage("es")}>Español</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
type LayoutProps = {
  children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  if (router.pathname === "/") {
    return <>{children}</>;
  }

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
