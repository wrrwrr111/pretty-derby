import os
import UnityPy
from UnityPy.enums import ClassIDType
import sqlite3
from PIL import Image
from pathlib import Path
from enum import Enum

ROOT = Path(__file__).parent
MINIMUM_QUERIES = {
    'chara_card': '''SELECT n, l, h FROM a WHERE n LIKE "chara/chr%/chr+_icon+_%+_1%+_01" ESCAPE "+"''',
    'support_card': 'SELECT n, l, h FROM a WHERE n LIKE "supportcard/support%/%thumb%"',
    'obtain_icon': 'SELECT n, l, h FROM a WHERE n LIKE "%utx_ico_obtain%"'
}
FULL_OUTPUT_QUERIES = {
    'chara_card': 'SELECT n, l, h FROM a WHERE n LIKE "chara/chr%" AND n NOT LIKE "%petit%"',
    'support_card': 'SELECT n, l, h FROM a WHERE n LIKE "supportcard/%"',
    'obtain_icon': 'SELECT n, l, h FROM a WHERE n LIKE "%utx_ico_obtain%"'
}


class TrainingCommandId(Enum):
    obtain_00 = 101  # Speed
    obtain_01 = 105  # Stamina
    obtain_02 = 102  # Power
    obtain_03 = 103  # Guts
    obtain_04 = 106  # Wiz
    obtain_05 = 0  # Friendship


def extract_card_assets(data_folder_path: str = '', output_path: str = 'img', minimum: bool = True, skip_existing: bool = True):
    if not data_folder_path:
        # Assume using DMM
        data_folder_path = Path(os.getenv('APPDATA'), '../', 'LocalLow', 'Cygames', 'umamusume')
    else:
        data_folder_path = Path(data_folder_path)

    output_folder_path = Path(ROOT, output_path)
    dat_path = Path(data_folder_path, 'dat')

    db = sqlite3.connect(Path(data_folder_path, 'meta'))
    if minimum:
        for asset_type, query in MINIMUM_QUERIES.items():
            extract_img_assets(db, dat_path, Path(output_folder_path, asset_type), query, skip_existing)
    else:   # extract all assets
        for asset_type, query in FULL_OUTPUT_QUERIES.items():
            extract_img_assets(db, dat_path, Path(output_folder_path, asset_type), query, skip_existing)
    db.close()

    master_db = sqlite3.connect(Path(data_folder_path, 'master', 'master.mdb'))
    add_icon_to_support_cards(master_db, output_folder_path, skip_existing)
    master_db.close()


def extract_img_assets(db, dat_path, output_path, query, skip_existing):
    if not output_path.exists():
        os.makedirs(output_path)

    for name, size, h in db.execute(query):
        out_file_path = Path(output_path, name.split('/')[-1] + '.png')
        if skip_existing and out_file_path.exists():
            continue
        ab = UnityPy.load(Path(dat_path, h[:2], h).as_posix())
        for obj in ab.objects:
            if obj.type in [ClassIDType.Texture2D, ClassIDType.Sprite]:
                data = obj.read()
                img = data.image
                # TODO better filter
                if ('thumb' in data.name or 'tex' in data.name) and img.width == img.height:
                    img = img.resize((int(img.width * 3 / 4), img.height))
                img.save(out_file_path)


def add_icon_to_support_cards(master_db, img_resources_folder, skip_existing: bool = True):
    output_folder = Path(img_resources_folder, 'support_card_with_icon')
    if not output_folder.exists():
        os.makedirs(output_folder)
    for card_id, command_id in master_db.execute('SELECT id, command_id FROM support_card_data'):
        card_path = Path(img_resources_folder, 'support_card', f'support_thumb_{card_id}.png')
        output_file_path = Path(output_folder, f'support_thumb_{card_id}.png')
        if skip_existing and output_file_path.exists():
            continue
        card = Image.open(card_path)
        icon_path = Path(img_resources_folder, 'obtain_icon', f'utx_ico_{TrainingCommandId(command_id).name}.png')
        icon = Image.open(icon_path)
        icon = icon.resize((card.width * 5 // 24, card.width * 5 // 24))
        card.paste(icon, (card.width - icon.width - 10, -1), icon)
        card.save(output_file_path)


if __name__ == '__main__':
    extract_card_assets()
    # 如需输出所有相关素材
    # extract_card_assets(minimum=False)
    # 覆盖已经存在的素材
    # extract_card_assets(skip_existing=False)
    # 手动输入资源所在文件夹与素材输出文件夹
    # extract_card_assets(data_folder_path='path_to_data_folder', output_path='path_to_output_folder')
