PDFLATEX = pdflatex -interaction=nonstopmode -halt-on-error -output-directory=build

all: build/istiak-islam-cv.pdf build/istiak-islam-cv-photo.pdf copy

build/istiak-islam-cv.pdf: istiak-islam-cv.tex src/body.tex
	mkdir -p build
	$(PDFLATEX) istiak-islam-cv.tex
	$(PDFLATEX) istiak-islam-cv.tex

build/istiak-islam-cv-photo.pdf: istiak-islam-cv-photo.tex src/body.tex photo/istiak.jpg
	mkdir -p build
	$(PDFLATEX) istiak-islam-cv-photo.tex
	$(PDFLATEX) istiak-islam-cv-photo.tex

# Final PDFs live in cv/ root; no-photo version also becomes the site resume
copy:
	cp build/istiak-islam-cv.pdf istiak-islam-cv.pdf
	cp build/istiak-islam-cv-photo.pdf istiak-islam-cv-photo.pdf
	cp build/istiak-islam-cv.pdf ../public/istiak-islam-resume.pdf

clean:
	rm -rf build

.PHONY: all copy clean
