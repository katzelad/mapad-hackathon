package controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFShape;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFSlideLayout;
import org.apache.poi.xslf.usermodel.XSLFSlideMaster;

public class main {

	public static void main(String[] args) throws FileNotFoundException, IOException {
		// TODO Auto-generated method stub


		XMLSlideShow ppt = new XMLSlideShow(new FileInputStream(new File("C:\\GitProjects\\mapad-hackathon\\files\\orYoung.pptx")));
		XSLFSlide[] slides = ppt.getSlides();
		for(int i = 0; i < slides.length; i++)
		{
			XSLFShape[] shapes = slides[i].getShapes();
			System.out.println(shapes);
		}
		
//	    for(XSLFSlideMaster master : ppt.getSlideMasters()){
//	        for(XSLFSlideLayout layout : master.getSlideLayouts()){
//	            System.out.println(layout.getType());
//	        }
//	    }
	}

}
