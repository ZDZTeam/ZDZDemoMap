package com.zdz.map.baidu;

import android.content.Context;
import android.view.View;

import com.baidu.mapapi.map.BaiduMapOptions;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.model.LatLng;
import com.zdzsoft.lib.ui.ZDZUIFactory;

/**
 * 百度地图视图类工厂
 * 
 * @author zdzsoft
 * @link www.zdzsoft.com
 * @Copyright BeiJing ZDZ Tech Co.LTD
 */
public class BMapFactory implements ZDZUIFactory {

	/**
	 * 创建自定义插件视图
	 * 
	 * @param context
	 *            环境
	 * @param classPath
	 *            类路径
	 * @param source
	 *            参数信息
	 * @return 自定义插件视图
	 * @throws Exception
	 *             创建失败
	 */
	@Override
	public View createView(Context context, String classPath, String source) throws Exception {
		BaiduMapOptions options = new BaiduMapOptions();
		if (source != null && source.length() > 0) {
			double x = getDouble(source, "x:");
			double y = getDouble(source, "y:");
			LatLng position = new LatLng(y, x);
			MapStatus status = new MapStatus.Builder().target(position).build();
			options.mapStatus(status);
		}
		MapView view = new MapView(context, options);
		return view;
	}

	/**
	 * 创建自定义插件视图的代理类
	 * 
	 * @param view
	 *            自定义插件视图
	 * @return 代理类
	 */
	public Object createViewCaller(View view) {
		return new BMapCaller((MapView) view);
	}

	private double getDouble(String source, String tag) {
		int start = source.indexOf(tag);
		int end = source.indexOf(";", start);
		if (end <= start) {
			end = source.length();
		}
		String string = source.substring(start + tag.length(), end).trim();
		return Double.parseDouble(string);
	}

}
