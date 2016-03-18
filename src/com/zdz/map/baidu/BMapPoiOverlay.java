package com.zdz.map.baidu;

import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.overlayutil.PoiOverlay;
import com.baidu.mapapi.search.poi.PoiSearch;

/**
 * 查询结果
 * 
 * @author zdzsoft
 * @link www.zdzsoft.com
 * @Copyright BeiJing ZDZ Tech Co.LTD
 */
public class BMapPoiOverlay extends PoiOverlay {
	private BMapCaller caller = null;
	private PoiSearch search = null;

	public BMapPoiOverlay(BaiduMap baiduMap, BMapCaller caller, PoiSearch search) {
		super(baiduMap);
		this.caller = caller;
		this.search = search;
	}

	@Override
	public boolean onPoiClick(int index) {
		super.onPoiClick(index);
		// PoiInfo poi = getPoiResult().getAllPoi().get(index);
		// search.searchPoiDetail((new PoiDetailSearchOption()).poiUid(poi.uid));
		caller.onSearchClick(index);
		zoomToSpan(index);
		return true;
	}
}
