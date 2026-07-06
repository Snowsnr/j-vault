#!/bin/bash
cd public/Naruto

count=0
total=$(ls *.pdf | wc -l)

for file in *.pdf; do
  count=$((count+1))
  echo "[$count/$total] Reparando '$file'..."
  
  # Usar Ghostscript para reescribir el PDF
  gs -o "temp_repair.pdf" -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress "$file" > /dev/null 2>&1
  
  if [ $? -eq 0 ]; then
    mv "temp_repair.pdf" "$file"
    echo " -> Éxito"
  else
    echo " -> Error al reparar"
    rm -f "temp_repair.pdf"
  fi
done

echo "¡Proceso de reparación finalizado por completo!"
