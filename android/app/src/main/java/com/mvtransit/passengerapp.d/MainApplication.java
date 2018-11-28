package com.mvtransit.passengerapp.d;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.futurepress.staticserver.FPStaticServerPackage;
import com.rnfs.RNFSPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import java.io.InputStream;import java.io.OutputStream;import java.io.FileOutputStream;
import java.io.File;
import android.content.Context;
import java.io.IOException;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FPStaticServerPackage(),
            new RNFSPackage(),
          new ReactNativePushNotificationPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    copyFileOrDir("static");
  }


  private void copyFileOrDir(String path) {
    try {
        String assets[] = getAssets().list(path);
        if (assets.length == 0) {
            copyFile(path);
        } else {
            String fullPath =  path;
            File dir = new File(getFilesDir(),fullPath);
            if (!dir.exists())
                dir.mkdir();
            for (int i = 0; i < assets.length; ++i) {
                copyFileOrDir(path + "/" + assets[i]);
            }
        }
    } catch (IOException e) {
         e.printStackTrace();
    }
}

private void copyFile(String fileName) {
    try {
            FileOutputStream outputStream;
            InputStream inputStream;
            byte[] bufferAudioFile;
            String str = null;

            inputStream = getAssets().open(fileName);
            int size = inputStream.available();
            bufferAudioFile = new byte[size];
            inputStream.read(bufferAudioFile);
            inputStream.close();

            str = getApplicationContext().getFilesDir() + "/" + fileName;
            File file = new File(str);
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(bufferAudioFile);
            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
  }

}
