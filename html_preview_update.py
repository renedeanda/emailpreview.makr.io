import os

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)

def update_layout_file(path):
    with open(path, 'r') as f:
        content = f.read()
    
    updated_content = content.replace(
        "import '@/styles/globals.css';",
        "import './globals.css';"
    )
    
    with open(path, 'w') as f:
        f.write(updated_content)

def update_project():
    # Update src/app/layout.tsx
    layout_path = "src/app/layout.tsx"
    if os.path.exists(layout_path):
        update_layout_file(layout_path)
        print(f"Updated {layout_path}")
    else:
        print(f"Warning: {layout_path} not found. Please check the file structure.")

    # Create src/app/globals.css
    globals_css_path = "src/app/globals.css"
    globals_css_content = """
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply antialiased;
}

.font-iowan-old-style {
  font-family: 'Iowan Old Style', serif;
}
    """
    create_file(globals_css_path, globals_css_content)
    print(f"Created {globals_css_path}")

    print("Update complete!")
    print("Next steps:")
    print("1. Run 'npm run dev' to start the development server")
    print("2. Open http://localhost:3000 in your browser to see the application")

if __name__ == "__main__":
    update_project()
