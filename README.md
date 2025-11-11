# 📜 Biblical Genealogy Tree

An interactive visualization of biblical genealogies from God through the patriarchs to King David and beyond. Explore the family connections with rich biographical information from Wikipedia.

## 🌐 Live Demo

**[View the Interactive Tree](https://vyaron.github.io/bible-tree/)**

## ✨ Features

- **Interactive Family Tree**: Visual representation of biblical genealogies with parent-child connections
- **Hebrew Names**: Display of original Hebrew names (שמות עבריים) alongside English translations
- **Color-Coded Families**: Visual distinction of children by their mothers
  - Jacob's 4 wives and 12 sons (tribes of Israel)
  - David's wives and children
- **Wikipedia Integration**: Click any person to view biographical information, images, and links to Wikipedia
- **Smart Connection Lines**: Tree-structure visualization showing family relationships
- **Couple Grouping**: Spouses are displayed together for better relationship understanding

## 🛠️ Technologies Used

- **Vanilla JavaScript (ES6 Modules)**: Modern JavaScript with import/export syntax
- **SVG Graphics**: Dynamic connection lines drawn with Scalable Vector Graphics
- **HTML5**: Semantic HTML with native `<dialog>` element for modals
- **CSS3**: Modern styling with flexbox, custom properties, and transitions
- **Wikipedia REST API**: Fetching biographical data and images
- **GitHub Pages**: Static hosting for the live demo

## 📚 Biblical Coverage

The tree currently includes:

- **Genesis**: God → Adam → Noah → Abraham → Isaac → Jacob → 12 Tribes
- **Exodus**: Moses and his lineage through Levi
- **Ruth & Judges**: Boaz → Obed → Jesse → David
- **Kings**: David's family including his wives and children (Solomon, Nathan, Absalom, etc.)

## 🏗️ Project Structure

```
bible-tree/
├── index.html              # Main HTML structure
├── css/
│   └── style.css          # Styling and visual design
├── js/
│   ├── main.js            # Core rendering logic and interactions
│   └── services/
│       ├── person.service.js  # Biblical persons data model (~90 figures)
│       └── wiki.service.js    # Wikipedia API integration
└── README.md
```

## 🎨 Key Features Explained

### Level-Based ID System
Each person has a unique ID in the format `pLEVELPOSITION`:
- `p101` = Level 1, Position 01 (Adam)
- `p2234` = Level 22, Position 34 (Jacob)

### Mother-Child Color Coding
Visual borders help identify family relationships:
- **Jacob's wives**: Leah (blue), Rachel (pink), Bilhah (green), Zilpah (purple)
- **David's wives**: Ahinoam (orange), Abigail (teal), Maacah (red), Haggith (brown), Bathsheba (gold)

### Wikipedia Search Strategy
The app uses multiple search strategies to find the most relevant Wikipedia articles:
1. Hebrew name alone (e.g., "דוד")
2. Hebrew name + "תורה" (e.g., "דוד תורה")
3. English name + "(Bible)" (e.g., "David (Bible)")
4. Fallback strategies for maximum accuracy

## 🚀 Getting Started

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/vyaron/bible-tree.git
cd bible-tree
```

2. Serve the files using any static server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open your browser to `http://localhost:8000`

### Development

No build process required! This is a vanilla JavaScript project that runs directly in the browser.

## 🤝 Contributing

Contributions are welcome! Here are some ideas:
- Add more biblical figures (Solomon → Kings of Judah → Jesus)
- Improve Wikipedia search accuracy
- Add date ranges and timeline features
- Implement zoom/pan functionality
- Add search and filtering capabilities

## 📖 Biblical Sources

All genealogical data is based on biblical texts:
- Genesis 1-50 (Creation through Joseph)
- Exodus 6 (Moses' lineage)
- Ruth 4 (Boaz → David)
- 1 Chronicles 1-3 (Complete genealogies)
- 2 Samuel 3, 5 (David's family)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Biblical genealogy data from the Hebrew Bible/Old Testament
- Wikipedia REST API for biographical information
- Hebrew text rendering using standard Unicode fonts

---

Made with ❤️ for exploring biblical history
