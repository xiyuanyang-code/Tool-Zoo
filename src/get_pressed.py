from PIL import Image
import os
import shutil


def compress_image_to_500kb(image_path, output_path):
    """
    将图片压缩到500KB以下，并处理RGBA和P模式的图片。
    """
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)

    try:
        file_size_kb = os.path.getsize(image_path) / 1024

        if file_size_kb <= 500:
            # print(f"图片已小于500KB ({file_size_kb:.2f}KB)，直接复制到: {output_path}")
            if image_path != output_path:
                shutil.copyfile(image_path, output_path)
            return

        print(f"原始图片大小: {file_size_kb:.2f}KB，开始压缩...")
        img = Image.open(image_path)

        # 核心改动：在保存为JPEG之前，转换图像模式
        if img.mode in ("RGBA", "P"):
            # 将图像转换为RGB模式。
            # RGBA模式的图像，透明部分会用白色填充。
            img = img.convert("RGB")

        file_size = os.path.getsize(image_path) / 1024

        if file_size <= 800:
            img.save(output_path)
            # print(f"图片已小于500KB，直接保存到: {output_path}")
            return

        print(f"原始图片大小: {file_size:.2f}KB，开始压缩...")

        quality = 95
        while True:
            img.save(output_path, quality=quality, optimize=True)
            compressed_size = os.path.getsize(output_path) / 1024
            print(f"使用质量 {quality} 压缩后大小: {compressed_size:.2f}KB")

            if compressed_size <= 500:
                print(f"压缩成功！文件已保存到: {output_path}")
                break

            quality -= 5

            if quality <= 10:
                print(f"警告：即使以最低质量 {quality} 压缩，文件仍然大于500KB。")
                break

    except Exception as e:
        print(f"压缩失败: {e}")


def rename_all():
    FILE_PATH = "./public/img/cover"

    if not os.path.isdir(FILE_PATH):
        print(f"Error: Directory not found at {FILE_PATH}")
    else:
        print(f"Processing directory: {FILE_PATH}")

        # 遍历目录中的所有文件
        for file in os.listdir(FILE_PATH):
            # 检查文件是否以 ".png" 结尾
            if file.endswith(".png"):
                # 完整的文件路径
                old_file = os.path.join(FILE_PATH, file)

                # 创建新的文件名，将 ".png" 替换为 ".jpg"
                new_file_name = file.replace(".png", ".jpg")

                # 构建新的完整文件路径
                new_file = os.path.join(FILE_PATH, new_file_name)

                try:
                    # 使用 os.rename() 函数重命名文件
                    os.rename(old_file, new_file)
                    print(f"Renamed: {old_file} -> {new_file}")
                except OSError as e:
                    print(f"Error renaming {old_file}: {e}")

    print("Done.")


def remove_zone():
    FILE_PATH = "./docs/assets"
    for file in os.listdir(FILE_PATH):
        if file.endswith("Zone.Identifier"):
            print(f"WARNING! Find Zone.Identifier in {file}")
            os.remove(os.path.join(FILE_PATH, file))


if __name__ == "__main__":
    # rename_all()
    remove_zone()
    FILE_PATH = "./docs/assets"
    # os.makedirs(SAVE_PATH, exist_ok=True)
    for file in os.listdir(FILE_PATH):
        image_url = os.path.join(FILE_PATH, file)
        # print(image_url)
        # print(f"Processing {image_url}")
        # print(save_url)
        compress_image_to_500kb(image_url, image_url)
