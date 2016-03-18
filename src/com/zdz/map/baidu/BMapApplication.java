package com.zdz.map.baidu;

import com.baidu.mapapi.SDKInitializer;
import com.zdzsoft.lib.ui.activity.ZDZApplication;

/**
 * 百度地图初始化 Application
 * 
 * @author zdzsoft
 * @link www.zdzsoft.com
 * @Copyright BeiJing ZDZ Tech Co.LTD
 */
public class BMapApplication extends ZDZApplication {

	@Override
	public void onCreate() {
		super.onCreate();
		SDKInitializer.initialize(this);
	}
}
