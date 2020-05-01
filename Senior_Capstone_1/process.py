import os

import pandas as pd

if __name__ == '__main__':
    images = pd.merge(
        pd.DataFrame({'Image Index': os.listdir('data/images')}),
        pd.read_csv('data/data.csv'),
        how='left',
        on='Image Index'
    )
    images.columns = [
        'Image_Index',
        'Finding_Labels',
        'Follow_Up_#',
        'Patient_ID',
        'Patient_Age',
        'Patient_Gender',
        'View_Position',
        'Original_Image_Width',
        'Original_Image_Height',
        'Original_Image_Pixel_Spacing_X',
        'Original_Image_Pixel_Spacing_Y'
    ]
    images['Finding_Labels'] = images['Finding_Labels'].apply(lambda x: x.split('|')[0])
    images.drop([
            'Original_Image_Width',
            'Original_Image_Height',
            'Original_Image_Pixel_Spacing_X',
            'Original_Image_Pixel_Spacing_Y'
        ],
        axis=1,
        inplace=True
    )
    images.to_csv('data/labels.csv', index=False, header=True)
