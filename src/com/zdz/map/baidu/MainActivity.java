package com.zdz.map.baidu;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.PixelFormat;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.baidu.mapapi.SDKInitializer;
import com.zdzsoft.lib.ui.activity.ZDZWebLauncher;
import com.zdzsoft.lib.ui.anim.AnimClearBackEvent;
import com.zdzsoft.lib.ui.anim.ZDZAnim;

/**
 * 主类
 * @author    zdzsoft
 * @link      www.zdzsoft.com
 * @Copyright BeiJing ZDZ Tech Co.LTD
 */
public class MainActivity extends ZDZWebLauncher {
	private boolean showInfo = false;

	public class SDKReceiver extends BroadcastReceiver {
		private MainActivity activity;

		public SDKReceiver(MainActivity activity) {
			this.activity = activity;
		}

		public void onReceive(Context context, Intent intent) {
			String s = intent.getAction();
			if (s.equals(SDKInitializer.SDK_BROADTCAST_ACTION_STRING_PERMISSION_CHECK_ERROR)) {
				activity.show("key 验证出错!");
			} else if (s.equals(SDKInitializer.SDK_BROADTCAST_ACTION_STRING_PERMISSION_CHECK_OK)) {
				activity.show("key 验证成功!");
			} else if (s.equals(SDKInitializer.SDK_BROADCAST_ACTION_STRING_NETWORK_ERROR)) {
				activity.show("网络出错!");
			}
		}
	}

	private SDKReceiver mReceiver;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// 注册 SDK 广播监听者
		IntentFilter iFilter = new IntentFilter();
		iFilter.addAction(SDKInitializer.SDK_BROADTCAST_ACTION_STRING_PERMISSION_CHECK_OK);
		iFilter.addAction(SDKInitializer.SDK_BROADTCAST_ACTION_STRING_PERMISSION_CHECK_ERROR);
		iFilter.addAction(SDKInitializer.SDK_BROADCAST_ACTION_STRING_NETWORK_ERROR);
		mReceiver = new SDKReceiver(this);
		registerReceiver(mReceiver, iFilter);

		getWindow().setFormat(PixelFormat.TRANSLUCENT);
		enableSurface();
		setBackground(R.drawable.welcome);
		setAnim(ZDZAnim.TYPE_FADE, 2000).addEvent(new AnimClearBackEvent(this));
		loadLocal();
	}

	public void show(String msg) {
		if (showInfo) {
			Toast.makeText(this, msg, Toast.LENGTH_LONG).show();
		}
		Log.i("BaiduMap", msg);
	}
}