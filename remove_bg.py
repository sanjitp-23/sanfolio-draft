import sys
import os

try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def remove_bg(input_path, output_path):
    print(f"Opening {input_path}")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    bg_color = datas[0] # Assume top-left pixel is background
    
    # We will compute distance from bg_color
    for item in datas:
        dist = sum(abs(item[i] - bg_color[i]) for i in range(3))
        if dist < 15:
            new_data.append((255, 255, 255, 0)) # Fully transparent
        elif dist < 50:
            # Partial transparency for anti-aliasing
            alpha = int(255 * (dist - 15) / 35)
            new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    remove_bg("public/images/sanfolio_logo.png", "public/images/sanfolio_logo_transparent.png")
