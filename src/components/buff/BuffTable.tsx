import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { buffsAtom } from "../../hooks/atoms";
const BuffTable = () => {
  const { t } = useTranslation();
  const [buffs] = useAtom(buffsAtom);
  const cellStyle = {
    // width:'20%',
    height: "32px",
    fontSize: 16,
    textAlign: "start" as "start",
    paddingLeft: 16,
    fontWeight: 500,
    borderWidth: "thin",
    borderStyle: "solid solid solid solid",
    borderColor: "gray",
  };
  return (
    <table>
      <tbody>
        {buffs.map((buff) => (
          <tr key={buff.name}>
            <td style={{ ...cellStyle }}>{t(buff.name)}</td>
            <td style={{ ...cellStyle }}>{t(buff.describe)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default BuffTable;
