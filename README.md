# Photo Library

A pixel-inspired, minimalist photo library web application built with React.js, Tailwind CSS, and shadcn/ui.

## 🎨 Design Philosophy

This app features a **clean, minimalist aesthetic** with subtle **pixel-art inspired touches**:

- **Dark theme** for a calm, modern gallery feel
- **Pixel-style borders** with layered frame effects
- **Smooth transitions** and hover states
- **Clean typography** and consistent spacing
- **Subtle shadows** and backdrop blur effects

## 🚀 Features

- 📸 **Photo Grid**: Responsive grid layout with framed photo cards
- 🔍 **Image Modal**: Full-screen preview with smooth animations
- ⬆️ **Upload**: Drag & drop or click to upload images
- 💾 **Backend Storage**: Photos stored in Supabase (shared across all users)
- 🗑️ **Delete**: Remove photos with confirmation
- ⬇️ **Download**: Download any photo from the library
- ⌨️ **Keyboard Support**: ESC key to close modals
- 🌐 **Shared Library**: All users see the same photos when deployed

## 🛠️ Tech Stack

- **React.js** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components (Button, Dialog)
- **lucide-react** - Icons
- **framer-motion** - Animations
- **Supabase** - Database & file storage
- **Vercel Serverless Functions** - API backend

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔧 Backend Setup

This app uses **Supabase** for backend storage. **All users will see the same photos** when deployed.

See [SETUP.md](./SETUP.md) for detailed backend setup instructions.

**Quick setup:**
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL script in `supabase-setup.sql` in Supabase SQL Editor
3. Copy `env.template` to `.env` and add your Supabase credentials
4. Deploy to Vercel and add the same environment variables

## 🧩 Component Structure

```
src/
 ├─ components/
 │   ├─ ui/
 │   │   ├─ button.jsx      # Reusable button component
 │   │   └─ dialog.jsx      # Modal/dialog component
 │   ├─ Gallery.jsx         # Main gallery container
 │   ├─ PhotoCard.jsx       # Individual photo card
 │   ├─ UploadDialog.jsx    # Upload interface
 │   └─ ImageModal.jsx      # Full-screen image viewer
 ├─ lib/
 │   └─ utils.js            # Utility functions (cn helper)
 ├─ App.jsx                 # Main app component
 └─ index.css              # Global styles & theme
```

## 🎯 Design Choices

### Pixel Aesthetic
- **Layered borders**: Multiple border layers create a pixel-art frame effect
- **Crisp edges**: Using `border-2` and `border-4` for defined edges
- **Subtle opacity**: Layered borders with reduced opacity for depth

### Color Palette
- **Dark theme**: Soft dark background (`hsl(0 0% 3.9%)`) for reduced eye strain
- **Muted accents**: Subtle color variations for hierarchy
- **High contrast**: Clear distinction between interactive elements

### Interactions
- **Hover overlays**: Action buttons appear on photo hover
- **Smooth animations**: Framer Motion for modal transitions
- **Scale effects**: Subtle scale on hover for feedback

## 🔧 Extending the App

### Adding Photo Metadata
Extend the photo object in `App.jsx`:
```jsx
const photo = {
  id: Date.now().toString(),
  name: file.name,
  data: e.target.result,
  uploadedAt: new Date().toISOString(),
  tags: [], // Add tags
  description: "", // Add description
}
```

### Adding Filters/Search
1. Add state for filter/search in `App.jsx`
2. Filter photos array before passing to `Gallery`
3. Add search input in `Gallery` component

### Adding Categories/Collections
1. Add category field to photo objects
2. Create category filter UI
3. Group photos by category in the grid

### Adding Light Theme
1. Remove `class="dark"` from `index.html`
2. Or add a theme toggle using the existing CSS variables

### Adding Backend Integration
Replace localStorage with API calls:
```jsx
// Replace localStorage with fetch calls
const uploadPhoto = async (photo) => {
  const response = await fetch('/api/photos', {
    method: 'POST',
    body: JSON.stringify(photo)
  })
  return response.json()
}
```

### Adding Image Editing
Integrate a library like `react-image-crop` or `fabric.js`:
1. Add edit button to `PhotoCard`
2. Create `EditDialog` component
3. Process image and update photo data

## 📝 Notes

- **Backend**: Images are stored in Supabase Storage (shared across all users)
- **Database**: Photo metadata stored in Supabase PostgreSQL
- **API**: Vercel serverless functions handle all backend operations
- All components are fully accessible with keyboard navigation
- The app is mobile-responsive with a responsive grid layout
- **Shared Library**: When deployed, all users see and can modify the same photo library

## 🎨 Customization

### Changing Theme Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: 0 0% 9%;
  --background: 0 0% 100%;
  /* ... */
}
```

### Adjusting Grid Layout
Modify grid classes in `Gallery.jsx`:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

### Changing Frame Style
Modify border classes in `PhotoCard.jsx` and `ImageModal.jsx` to adjust the pixel aesthetic.
