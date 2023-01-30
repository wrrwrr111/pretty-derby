import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { buffsAtom } from "../../hooks/atoms";
const BuffTable = () => {
  const { t } = useTranslation();
  const [buffs] = useAtom(buffsAtom);

  return (
    <table>
      <tbody>
        {buffs.map((buff) => (
          <tr key={buff.name}>
            <td className="h-8 border border-solid border-gray-500 pl-4 text-center font-medium">
              {t(buff.name)}
            </td>
            <td className="h-8 border border-solid border-gray-500 pl-4 text-center font-medium">
              {t(buff.describe)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default BuffTable;
