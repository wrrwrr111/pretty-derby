import { useState, useMemo } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  Archive,
  Menu,
  MultiplePages,
  ProfileCircle,
  SelectFace3d,
  Xmark,
  MediaImage,
} from "iconoir-react";

import useUa from "@cra/utils/ua";

import { useTranslation } from "react-i18next";
import { PC_MENU_LIST, MOBILE_MENU_LIST } from "@cra/config";

export const SiteHeader = () => {
  const [openNav, setOpenNav] = useState(false);
  const ua = useUa();

  const navList = useMemo(() => {
    const list = ua.isPhone ? MOBILE_MENU_LIST : PC_MENU_LIST;
    return (
      <ul className="m-2 flex flex-col gap-x-3 gap-y-1 lg:m-0 lg:flex-row lg:items-center">
        {list.map(({ title, path }) => (
          <li key={title}>
            <Typography
              as="a"
              href={path}
              type="small"
              className="p-1 hover:text-primary"
            >
              {title}
            </Typography>
          </li>
        ))}
      </ul>
    );
  }, [ua]);

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center">
        <Typography
          as="a"
          href="#"
          type="small"
          className="mx-2 block py-1 font-semibold"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:ml-auto lg:mr-2 lg:block">{navList}</div>
        <IconButton
          size="sm"
          variant="ghost"
          color="secondary"
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto grid lg:hidden"
        >
          {openNav ? (
            <Xmark className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>{navList}</Collapse>
    </Navbar>
  );
};
