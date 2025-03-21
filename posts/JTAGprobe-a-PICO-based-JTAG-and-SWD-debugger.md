---
title: 'JTAGprobe a pico based JTAG and SWD debugger'
slug: 'email-subscriptions-with-mailchimp'
date: '2022-12-19'
description: 'Make a debugger using PICO to debug MCUs'
image: '/images/jtagprobe/title_1.webp'
tags: ['nextjs', 'reactjs']
---

# JTAGprobe
A fork of opensource version of **debugprobe** built on RASPBERRY pico.It is extendedand  modified to work with JTAG and SWD. This does not use  FIFO and PIO functionality of **debugprobe** but uses  standard ARM CMSIS-DAP.

This supports both **JTAG & SWD** for debugging using OpenOCD, Hence the name **JTAGprobe**

___
The following is **GPIO pinout** for JTAG/SWD 


| GPIO       | Pinout  |
| --------   | ------- |
| SWCLK_TCK  | 19      |
| SWDIO_TMS  | 14      |
| TDI        | 18      |
| TDO        | 21      |
| nTRST      | 15      |
| nRESET     | 16      |



|   |   |   |   |   |
|---|---|---|---|---|
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |

You can download **UF2** file or download entire code and build it as mentioned below.

# Images of debugging PICO with another PICO and Bluepill

![Bluepill Debug](/images/jtagprobe/bluepilldebug.webp)

![Pico Debug](/images/jtagprobe/picodebug_1.webp)



# Hacking

For the purpose of making changes or studying of the code, you may want to compile the code yourself.

First, clone the repository:
```
git clone https://github.com/dst202/JTAGprobe
cd JTAGprobe
```
Initialize and update the submodules:
```
 git submodule update --init
```
Then create and switch to the build directory:
```
 mkdir build
 cd build
```
If your environment doesn't contain `PICO_SDK_PATH`, then either add it to your environment variables with `export PICO_SDK_PATH=/path/to/sdk` or add `PICO_SDK_PATH=/path/to/sdk` to the arguments to CMake below.

Run cmake and build the code:
```
 cmake ..
 make
```
Done! You should now have a `JTAGprobe.uf2` that you can upload to your JTAG Probe via the UF2 bootloader.
