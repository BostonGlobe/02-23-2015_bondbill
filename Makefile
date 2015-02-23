R:

	Rscript -e "rmarkdown::render('data/02-23-2015-bondbill.Rmd')"
	open data/02-23-2015-bondbill.html

R_deploy:

	cp data/02-23-2015-bondbill.html /Volumes/www_html/multimedia/graphics/projectFiles/Rmd/
	rsync -rv data/02-23-2015-bondbill_files /Volumes/www_html/multimedia/graphics/projectFiles/Rmd
	open http://private.boston.com/multimedia/graphics/projectFiles/Rmd/02-23-2015-bondbill.html