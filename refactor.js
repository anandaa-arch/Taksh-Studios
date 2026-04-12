const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'app/globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/--accent:\s*#FF5C00;/g, '--accent: #F0EDE8;');
css = css.replace(/--accent-warm:\s*#C8924A;/g, '--accent-warm: #9A9088;');
css = css.replace(/--accent-glow:\s*rgba\(255,92,0,0\.12\);/g, '--accent-glow: rgba(240,237,232,0.12);');
css = css.replace(/--radius:\s*0\.5rem;/g, '--radius: 3px;');

// hero-gradient-bg inside globals.css
css = css.replace(/\.hero-gradient-bg\s*\{[\s\S]*?animation:\s*heroGlow[^}]*\}/g, `.hero-gradient-bg {
    background: 
      radial-gradient(ellipse 80% 60% at 60% 40%, 
        rgba(240, 237, 232, 0.025) 0%, 
        transparent 60%),
      #0C0A08;
    animation: heroGlow 8s ease-in-out infinite alternate;
  }`);

fs.writeFileSync(cssPath, css);

function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = [dir];
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (dirent.name !== 'node_modules' && dirent.name !== '.next') {
        files.push(...getFiles(res));
      }
    } else {
      files.push(res);
    }
  }
  return files.filter(f => f.endsWith('.tsx'));
}

const files = getFiles(path.join(__dirname, 'app')).concat(getFiles(path.join(__dirname, 'components')));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Navbar.tsx
  if (file.endsWith('Navbar.tsx')) {
    content = content.replace(/bg-accent text-white/g, 'bg-text-primary text-bg');
    content = content.replace(/rounded-full/g, 'rounded-[3px]');
  }

  // 2. SideDotNav.tsx
  if (file.endsWith('SideDotNav.tsx')) {
    content = content.replace(/shadow-\[0_0_8px_rgba\(255,92,0,0\.5\)\]/g, 'shadow-[0_0_8px_rgba(240,237,232,0.5)]');
  }

  // 3. All buttons border-radius & colors
  content = content.replace(/rounded-full|rounded-lg|rounded-md|rounded(?!-\[)/g, 'rounded-[3px]');
  content = content.replace(/bg-accent text-white/g, 'bg-text-primary text-bg');
  
  // Custom button styling in other places
  content = content.replace(/bg-accent/g, 'bg-text-primary text-bg');
  // Secondary buttons that were white border (like category pills or Material/Finish buttons in detail view)
  content = content.replace(/border-border text-text-secondary hover:border-text-secondary/g, 'border-transparent border-[1.5px] border-text-primary/20 text-text-primary hover:border-text-primary');

  // 4. All text links — white with faint underline
  content = content.replace(/hover:border-b hover:border-accent-warm/g, 'hover:border-b hover:border-text-primary');
  content = content.replace(/hover:border-b hover:border-accent/g, 'border-transparent hover:border-b hover:border-text-primary');
  content = content.replace(/hover:text-accent/g, 'text-text-primary hover:border-b hover:border-text-primary/50');
  content = content.replace(/hover:text-accent-warm/g, 'text-text-primary hover:border-b hover:border-text-primary/50');

  // 5. Product cards
  if (file.endsWith('ProductCard.tsx')) {
    content = content.replace(/group-hover:border-accent\/40/g, 'group-hover:border-white/40');
    content = content.replace(/shadow-\[0_0_24px_rgba\(255,92,0,0\.12\)\]/g, 'shadow-[0_0_24px_rgba(240,237,232,0.12)]');
    content = content.replace(/text-accent/g, 'text-text-primary');
  }

  // 6. Chapter labels
  if (file.endsWith('WoodChapter.tsx')) {
    content = content.replace(/colorClass="text-accent-warm"/g, 'colorClass="text-text-muted"');
  }

  // 7. Footer gradient line
  if (file.endsWith('Footer.tsx')) {
    content = content.replace(/from-transparent via-accent to-transparent/g, 'from-transparent via-text-primary/20 to-transparent');
    content = content.replace(/from-accent via-accent-warm/g, 'from-text-primary/30 via-text-primary/10');
  }

  // Misc 
  content = content.replace(/text-accent-warm/g, 'text-text-primary');
  content = content.replace(/text-accent/g, 'text-text-primary');

  if (content !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
