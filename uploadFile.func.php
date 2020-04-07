<?php
/*
 *	Upload Image Response
 *	200407
 */

function uploadFile( $dir, $name, $width, $quality, $temp, $imgOnly = false ) {
 	if ( !scandir( $dir ) ) {
 		mkdir( $dir, 0777 );
 	};

 	$targetFile = $dir . basename( $name );
 	$info = getimagesize( $temp );
 	$mime = $info[ 'mime' ];
 	$ext = strtolower(pathinfo( $name, PATHINFO_EXTENSION ));

 	$quality = max( 0, min( 100, $quality ) );

 	if ( $ext == "jpg" || $ext == "jpeg" || $ext == "png" ) {

 		switch ( $mime ) {
 			case 'image/jpeg':
 				$image_create_func = 'imagecreatefromjpeg';
 				$image_save_func = 'imagejpeg';
 				$new_image_ext = 'jpg';
 				break;

 			case 'image/png':
 				$image_create_func = 'imagecreatefrompng';
 				$image_save_func = 'imagepng';
 				$new_image_ext = 'png';
 				$quality = $quality * 0.1;
 				break;
 				/* // Cannot support animated gif yet
 				case 'image/gif':
 					$image_create_func = 'imagecreatefromgif';
 					$image_save_func = 'imagegif';
 					$new_image_ext = 'gif';
 					//		imagegif( $temp, $temp );
 					break;
 				*/
 			default:
 				echo " not an image";
 		}
 		$img = $image_create_func( $temp );
 		list( $imageWidth, $imageHeight ) = getimagesize( $temp );

 		if ( !isset( $width ) || $width == null || $width == 0 ) {
 			$width = $imageWidth;
 		}

 		$height = ( $imageHeight / $imageWidth ) * $width;
 		$tmp = imagecreatetruecolor( $width, $height );
 		imagecolortransparent( $tmp, imagecolorallocatealpha( $img, 0, 0, 0, 127 ) );
 		imagealphablending( $tmp, false );
 		imagesavealpha( $tmp, true );
 		imagecopyresampled( $tmp, $img, 0, 0, 0, 0, $width, $height, $imageWidth, $imageHeight );

 		if ( file_exists( $targetFile ) ) {
 			unlink( $targetFile );
 			echo " file already exists";
 		}
 		if ( $image_save_func( $tmp, $targetFile, $quality ) ) {
      return true;
 		} else {
      return false;
    }
 	} else {
    if ( $imgOnly ) {
      echo " error:notimage";
    } else {
      if ( move_uploaded_file( $temp, $targetFile ) ) {
        return true;
      } else {
        return false;
      }
    }
 	}
}
