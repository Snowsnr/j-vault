#!/bin/bash
cd public/naruto_pdf

echo "Generando portadas de Naruto..."
for file in *.pdf; do
  if [[ "$file" =~ Tomo\ ([0-9]+) ]]; then
    num="${BASH_REMATCH[1]}"
    echo "Extrayendo Tomo $num..."
    gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=jpeg -r72 -dFirstPage=1 -dLastPage=1 -sOutputFile="../covers/naruto_${num}.jpg" "$file" > /dev/null 2>&1
  else
    echo "No se extrajo de: $file"
  fi
done

echo "¡Portadas generadas!"
